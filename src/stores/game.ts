import { defineStore } from 'pinia'
import type { Game } from '@/types/game'
import { ref } from 'vue'
import axios from 'axios'

export const useGameStore = defineStore('game', () => {
  const currentGame = ref<Game | null>(null)
  const loading = ref<boolean>(false)
  // TODO: crear un archivo de configuración global para cargar las env variables
  const serverUrl: string = import.meta.env.VITE_SERVER_URL

  // TODO: Estas función y `setLastGame` hacen lo mismo con ligeros cambios, dejar una
  // y crear otra función complementaria que haga la diferencia
  const fetchLastGame = () => {
    loading.value = true
    axios
      .get(serverUrl + '/game/last')
      .then((res) => {
        currentGame.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => (loading.value = false))
  }

  // Set the current game from the Records (no connection with DB)
  const setCurrentGame = (game: Game) => {
    currentGame.value = game
  }

  // Gets the last game and set it as current in the server
  const setLastGame = (): void => {
    loading.value = true
    axios
      .get(serverUrl + '/game/last', {
        params: { updateCurrent: true }
      })
      .then((res) => {
        setCurrentGame(res.data as Game)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => (loading.value = false))
  }

  return {
    currentGame,
    loading,
    fetchLastGame,
    setCurrentGame,
    setLastGame,
  }
})
