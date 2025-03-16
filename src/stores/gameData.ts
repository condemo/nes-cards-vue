import { useFetch } from "@/composables/useFetch";
import { useCreateGame, useCreatePlayer } from "@/composables/useGame";
import type { ApiError } from "@/types/apiCom";
import type { Game, GameSetup, Player } from "@/types/game";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameDataStore = defineStore('gameData', () => {
  const currentGame = ref<Game | null>(null)
  const loading = ref<boolean>(false)
  const apiError = ref<ApiError | null>(null)
  const playerList = useFetch<Player[]>('/player/').data

  const setCurrentGame = (game: Game) => {
    currentGame.value = game
  }

  const createPlayer = async (name: string) => {
    const { newPlayer, error } = await useCreatePlayer(name)
    playerList.value?.push(newPlayer.value as Player)
    apiError.value = error.value
  }

  const createGame = (game: GameSetup): void => {
    const { createdGame, error } = useCreateGame(game)
    if (error.value) {
      apiError.value = error.value
    } else {
      currentGame.value = createdGame.value
    }
  }

  return {
    currentGame,
    loading,
    apiError,
    playerList,
    setCurrentGame,
    createPlayer,
    createGame,
  }
})
