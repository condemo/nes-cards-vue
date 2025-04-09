import { defineStore, storeToRefs } from "pinia";
import { PlayerTurn, TurnMode } from '@/types/game'
import { PlayerMove } from '@/game/game'
import { computed, reactive } from "vue";
import { useGameDataStore } from "./gameData";
import { calculateDMG } from "@/utils/game";

export const useGameHandlerStore = defineStore('gameHandler', () => {
  const player1Move = reactive<PlayerMove>(new PlayerMove)
  const player2Move = reactive<PlayerMove>(new PlayerMove)

  const gameDataStore = useGameDataStore()
  const { currentGame } = storeToRefs(gameDataStore)

  // NOTE: Se puede mejorar mucho buscando la manera de mantener las defensas en las stats
  // y no en los `moves`

  // loads defenses from game into moves
  const loadDataFromGame = () => {
    const p1def = currentGame.value?.p1stats.defenses
    const p2def = currentGame.value?.p2stats.defenses
    player1Move.loadDefenses(p1def)
    player2Move.loadDefenses(p2def)
  }

  // computed data from currentGame for cleaner use
  const roundCount = computed(() => {
    return currentGame.value?.round
  })
  const currentPlayerTurn = computed(() => {
    return currentGame.value?.playerTurn
  })
  const turnMode = computed(() => {
    return currentGame.value?.turnMode
  })

  const updateDMG = (n: number[]): void => {
    if (currentPlayerTurn.value === PlayerTurn.Player1) {
      player1Move.damage.push(...n)
    } else {
      player2Move.damage.push(...n)
    }
  }

  const updateDEF = (n: number[]): void => {
    if (currentPlayerTurn.value === PlayerTurn.Player1) {
      n.forEach((value) => {
        player1Move.defense.push(value)
      })
    } else {
      n.forEach((value) => {
        player2Move.defense.push(value)
      })
    }
  }

  const updatePlayerStats = (stats: { confusion: number, strength: number, intangible: number }): void => {
    if (currentGame.value) {
      if (currentPlayerTurn.value === PlayerTurn.Player1) {
        currentGame.value.p1stats.confusion += stats.confusion
        currentGame.value.p1stats.strength += stats.strength
        currentGame.value.p1stats.intangible += stats.intangible
      } else {
        currentGame.value.p2stats.confusion += stats.confusion
        currentGame.value.p2stats.strength += stats.strength
        currentGame.value.p2stats.intangible += stats.intangible
      }
    }
  }

  const nextTurn = () => {
    if (currentGame.value) {
      if (turnMode.value === TurnMode.Defense) {
        // - Apply Distraction -
        player1Move.applyDistract(player2Move.distract)
        player2Move.applyDistract(player1Move.distract)

        // - DMG vs DF Moves -
        player1Move.damage = player2Move.applyDefense(player1Move.damage, currentGame.value.p1stats.strength)
        player2Move.damage = player1Move.applyDefense(player2Move.damage, currentGame.value.p1stats.strength)

        // - DMG Stats -
        currentGame.value = calculateDMG(currentGame.value, player1Move, player2Move)

        // - Rest Effects Turns -
        // confusion
        if (currentGame.value.p1stats.confusion > 0) {
          currentGame.value.p1stats.confusion -= 1
        }
        if (currentGame.value.p2stats.confusion > 0) {
          currentGame.value.p2stats.confusion -= 1
        }

        // intangible
        if (currentGame.value.p1stats.intangible > 0) {
          currentGame.value.p1stats.intangible -= 1
        }
        if (currentGame.value.p2stats.intangible > 0) {
          currentGame.value.p2stats.intangible -= 1
        }

        // update the remaining def into `Game.Stats` before saving
        currentGame.value.p1stats.defenses = player1Move.getDefValue().toString()
        currentGame.value.p2stats.defenses = player2Move.getDefValue().toString()

        player1Move.reset()
        player2Move.reset()

        currentGame.value.round += 1
        gameDataStore.saveGame()
      }

      if (currentPlayerTurn.value === PlayerTurn.Player1) {
        if (turnMode.value === TurnMode.Attack) {
          currentGame.value.playerTurn = PlayerTurn.Player2
        }
      } else {
        if (turnMode.value === TurnMode.Attack) {
          currentGame.value.playerTurn = PlayerTurn.Player1
        }
      }

      currentGame.value.turnMode = (
        turnMode.value === TurnMode.Attack
          ? TurnMode.Defense
          : TurnMode.Attack
      )
    }
  }

  return {
    currentPlayerTurn,
    player1Move,
    player2Move,
    updateDMG,
    updateDEF,
    updatePlayerStats,
    loadDataFromGame,
    turnMode,
    roundCount,
    nextTurn,
  }
})
