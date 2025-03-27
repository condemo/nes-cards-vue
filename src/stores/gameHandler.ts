import { defineStore, storeToRefs } from "pinia";
import { PlayerTurn, TurnMode } from '@/types/game'
import { PlayerMove } from '@/game/game'
import { computed, shallowReactive } from "vue";
import { useGameDataStore } from "./gameData";
import { calculateDMG } from "@/utils/game";

export const useGameHandlerStore = defineStore('gameHandler', () => {
  const player1Move = shallowReactive<PlayerMove>(new PlayerMove)
  const player2Move = shallowReactive<PlayerMove>(new PlayerMove)

  const gameDataStore = useGameDataStore()
  const { currentGame } = storeToRefs(gameDataStore)

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

  const nextTurn = () => {
    if (currentGame.value) {
      if (turnMode.value === TurnMode.Defense) {
        // - Apply Effects -
        // confusion
        currentGame.value.p1stats.confusion += player1Move.confusion
        currentGame.value.p2stats.confusion += player2Move.confusion
        // strength
        currentGame.value.p1stats.strength += player1Move.strength
        currentGame.value.p2stats.strength += player2Move.strength
        // intangible
        currentGame.value.p1stats.intangible += player1Move.intangible
        currentGame.value.p2stats.intangible += player2Move.intangible

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
    turnMode,
    roundCount,
    nextTurn,
  }
})
