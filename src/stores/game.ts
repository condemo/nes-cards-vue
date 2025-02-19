import { defineStore } from "pinia";
import type { Game } from '@/types/game'
import { ref } from "vue";
import axios from "axios";

export const useGameStore = defineStore('game', () => {
  let currentGame = ref<Game | null>(null)
  // TODO: crear un archivo de configuracion global para cargar las env variables
  const serverUrl: string = import.meta.env.VITE_SERVER_URL

  const fetchLastGame = () => {
    axios.
      get(serverUrl + "/game/last")
      .then(res => {
        currentGame.value = res.data
        console.log(currentGame.value)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const setCurrentGame = (game: Game) => {
    currentGame.value = game
  }

  const setLastGame = (): void => {
    axios.
      get(serverUrl + "/game/last")
      .then(res => {
        setCurrentGame(res.data as Game)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return {
    currentGame,
    fetchLastGame,
    setCurrentGame,
    setLastGame,
  }
})
