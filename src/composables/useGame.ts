import type { ApiError } from '@/types/apiCom'
import type { Game, GameSetup, Player } from '@/types/game'
import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

export const useCreateGame = (game: GameSetup) => {
  const createdGame = ref<Game | null>(null)
  const error = ref<ApiError | null>(null)

  axios
    .post(import.meta.env.VITE_SERVER_URL + '/game/', game)
    .then((res) => {
      createdGame.value = res.data as Game
    })
    .catch((e) => {
      console.log(e as ApiError)
      error.value = e as ApiError
    })

  return {
    createdGame,
    error
  }
}

export const useCreatePlayer = async (name: string) => {
  const newPlayer = ref<Player | null>()
  const error = ref<ApiError | null>(null)

  await axios
    // TODO: mover import.meta... a la store de configuración
    .post(import.meta.env.VITE_SERVER_URL + '/player/', { name: name })
    .then((res) => {
      newPlayer.value = res.data as Player
    })
    .catch((e) => {
      console.log(e)
      const errRes = (e as AxiosError).response?.data
      error.value = errRes as ApiError
    })
  return {
    newPlayer,
    error
  }
}
