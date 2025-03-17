import { defineStore, storeToRefs } from "pinia";
import { PlayerTurn, PlayerMove, TurnMode } from '@/types/game'
import { ref, shallowReactive } from "vue";
import { useGameDataStore } from "./gameData";

export const useGameHandlerStore = defineStore('gameHandler', () => {
  const turnMode = ref<TurnMode>(TurnMode.Attack)
  const roundCount = ref<number>(0)
  const currentPlayerTurn = ref<PlayerTurn>(PlayerTurn.Player1)
  const player1Move = shallowReactive<PlayerMove>(new PlayerMove)
  const player2Move = shallowReactive<PlayerMove>(new PlayerMove)

  const gameDataStore = useGameDataStore()
  const { currentGame } = storeToRefs(gameDataStore)

  const nextTurn = () => {
    if (currentGame.value) {
      if (turnMode.value === TurnMode.Defense) {
        // TODO: 'choque' de jugadas, apply en stats

        // DMG - DF Moves
        player1Move.attack(player2Move.defense)
        player2Move.attack(player1Move.defense)

        // DMG Stats

        player1Move.reset()
        player2Move.reset()
      }

      switch (currentPlayerTurn.value) {
        case PlayerTurn.Player1:
          if (turnMode.value === TurnMode.Attack) {
            currentPlayerTurn.value = PlayerTurn.Player2
          }
        case PlayerTurn.Player2:
          if (turnMode.value === TurnMode.Attack) {
            currentPlayerTurn.value = PlayerTurn.Player1
          }
      }

      turnMode.value = (
        turnMode.value === TurnMode.Attack
          ? TurnMode.Defense
          : TurnMode.Attack
      )
      roundCount.value += 1
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
