import { useFetch } from "@/composables/useFetch";
import { useCreateGame, useCreatePlayer, useGetLastGame } from "@/composables/useGame";
import type { ApiError } from "@/types/apiCom";
import type { Game, GameSetup, Player } from "@/types/game";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameDataStore = defineStore('gameData', () => {
  const currentGame = ref<Game | null>(null)
  const loading = ref<boolean>(false)
  const apiError = ref<ApiError | null>(null)
  const playerList = useFetch<Player[]>('/player/').data

  const createPlayer = async (name: string) => {
    loading.value = true
    const { newPlayer, error } = await useCreatePlayer(name)
    playerList.value?.push(newPlayer.value as Player)
    apiError.value = error.value
    loading.value = false
  }

  const createGame = async (game: GameSetup) => {
    loading.value = true
    const { createdGame, error } = await useCreateGame(game)
    currentGame.value = createdGame.value
    apiError.value = error.value
    loading.value = false
  }

  const setLastGame = async () => {
    const { lastGame } = await useGetLastGame()
    currentGame.value = lastGame.value
  }

  return {
    currentGame,
    loading,
    apiError,
    playerList,
    createPlayer,
    createGame,
    setLastGame
  }
})
