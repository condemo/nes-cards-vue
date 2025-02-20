import { defineStore } from "pinia";
import type { Game } from '@/types/game'
import { ref } from "vue";
import axios from "axios";

export const useGameStore = defineStore('game', () => {
  let currentGame = ref<Game | null>(null)
  let loading = ref<boolean>(false)
  // TODO: crear un archivo de configuracion global para cargar las env variables
  const serverUrl: string = import.meta.env.VITE_SERVER_URL

  const fetchLastGame = () => {
    loading.value = true
    axios.
      get(serverUrl + "/game/last")
      .then(res => {
        currentGame.value = res.data
        console.log(currentGame.value)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => loading.value = false)
  }

  const setCurrentGame = (game: Game) => {
    currentGame.value = game
  }

  const setLastGame = (): void => {
    loading.value = true
    axios.
      get(serverUrl + "/game/last")
      .then(res => {
        setCurrentGame(res.data as Game)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => loading.value = false)
  }

  return {
    currentGame,
    loading,
    fetchLastGame,
    setCurrentGame,
    setLastGame,
  }
})
