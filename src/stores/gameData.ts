import { useFetch } from "@/composables/useFetch";
import type { ApiError } from "@/types/apiCom";
import type { Game, Player } from "@/types/game";
import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameDataStore = defineStore('gameData', () => {
  const currentGame = ref<Game | null>(null)
  const loading = ref<boolean>(false)
  const apiError = ref<ApiError | null>(null)
  const playerList = useFetch<Player[]>('/player/').data

  const createPlayer = async (name: string) => {
    await axios
      .post(import.meta.env.VITE_SERVER_URL + '/player/', { name: name })
      .then((res) => {
        playerList.value?.push(res.data as Player)
        apiError.value = null
      })
      .catch((e) => {
        console.log(e)
        const errRes = (e as AxiosError).response?.data
        apiError.value = errRes as ApiError
      })
  }

  return {
    currentGame,
    loading,
    apiError,
    playerList,
    createPlayer,
  }
})
