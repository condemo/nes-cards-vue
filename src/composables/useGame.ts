import { useConfigStore } from '@/stores/config'
import type { ApiError } from '@/types/apiCom'
import type { Game, GameSetup, Player } from '@/types/game'
import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

// TODO: mover import.meta... a la store de configuración

export const useCreateGame = async (game: GameSetup) => {
  const configStore = useConfigStore()
  const serverUrl = configStore.envConfig.serverUrl
  const createdGame = ref<Game | null>(null)
  const error = ref<ApiError | null>(null)
  await axios
    .post(serverUrl + '/game/', game)
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
  const configStore = useConfigStore()
  const serverUrl = configStore.envConfig.serverUrl

  await axios
    .post(serverUrl + '/player/', { name: name })
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

export const useGetLastGame = async () => {
  const lastGame = ref<Game | null>(null)
  const configStore = useConfigStore()
  const serverUrl = configStore.envConfig.serverUrl
  await axios
    .get(serverUrl + '/game/last', {
      params: { updateCurrent: true }
    })
    .then((res) => {
      lastGame.value = res.data as Game
    })
    .catch((err) => {
      // TODO: Gestionar este error
      console.log(err)
    })
  return { lastGame }
}

export const useUpdateGame = async (game: Game) => {
  const configStore = useConfigStore()
  const serverUrl = configStore.envConfig.serverUrl
  await axios.
    put(serverUrl + '/game/', game)
    .catch(err => {
      // TODO: Gesionar este error
      console.log(err)
    })
}
