import { defineStore, storeToRefs } from "pinia";
import { PlayerTurn, PlayerMove, TurnMode } from '@/types/game'
import { ref, shallowReactive } from "vue";
import { useGameDataStore } from "./gameData";
import { calculateDMG } from "@/utils/game";

export const useGameHandlerStore = defineStore('gameHandler', () => {
  const turnMode = ref<TurnMode>(TurnMode.Attack)
  const roundCount = ref<number>(1)
  const currentPlayerTurn = ref<PlayerTurn>(PlayerTurn.Player1)
  const player1Move = shallowReactive<PlayerMove>(new PlayerMove)
  const player2Move = shallowReactive<PlayerMove>(new PlayerMove)

  const gameDataStore = useGameDataStore()
  const { currentGame } = storeToRefs(gameDataStore)

  const nextTurn = () => {
    if (currentGame.value) {
      if (turnMode.value === TurnMode.Defense) {
        // TODO: 'choque' de jugadas, apply en stats

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

        // - DMG vs DF Moves -
        player1Move.damage = player2Move.applyDefense(player1Move.damage)
        player2Move.damage = player1Move.applyDefense(player2Move.damage)

        // - DMG Stats -  TODO:
        currentGame.value = calculateDMG(currentGame.value, player1Move, player2Move)

        // Rest Effects Turns  TODO:
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

        roundCount.value += 1
      }

      if (currentPlayerTurn.value === PlayerTurn.Player1) {
        if (turnMode.value === TurnMode.Attack) {
          currentPlayerTurn.value = PlayerTurn.Player2
        }
      } else {
        if (turnMode.value === TurnMode.Attack) {
          currentPlayerTurn.value = PlayerTurn.Player1
        }
      }

      turnMode.value = (
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
    roundCount,
    nextTurn,
  }
})
