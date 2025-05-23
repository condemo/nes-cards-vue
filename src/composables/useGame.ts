import { useAuthStore } from '@/stores/auth'
import { useConfigStore } from '@/stores/config'
import type { ApiError } from '@/types/apiCom'
import type { Game, GameSetup, Player } from '@/types/game'
import axios, { AxiosError } from 'axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export const useCreateGame = async (game: GameSetup) => {
  const configStore = useConfigStore()
  const serverUrl = configStore.envConfig.serverUrl
  const createdGame = ref<Game | null>(null)
  const error = ref<ApiError | null>(null)
  const authStore = useAuthStore()
  const { isLogged } = storeToRefs(authStore)

  await axios
    .post(serverUrl + 'game/', game)
    .then((res) => {
      createdGame.value = res.data as Game
    })
    .catch((e) => {
      if (e.reponse.data.code === 401) {
        isLogged.value = false
      }
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
  const authStore = useAuthStore()
  const { isLogged } = storeToRefs(authStore)

  await axios
    .post(serverUrl + 'player/', { name: name })
    .then((res) => {
      newPlayer.value = res.data as Player
    })
    .catch((e) => {
      if (e.response.data.code === 401) {
        isLogged.value = false
      }
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
  const authStore = useAuthStore()
  const { isLogged } = storeToRefs(authStore)

  await axios
    .get(serverUrl + 'game/last', {
      params: { updateCurrent: true },
    })
    .then((res) => {
      lastGame.value = res.data as Game
    })
    .catch((err) => {
      if (err.reponse.data.code === 401) {
        isLogged.value = false
      }
      // TODO: Gestionar este error
      console.log(err)
    })
  return { lastGame }
}

export const useUpdateGame = async (game: Game) => {
  const configStore = useConfigStore()
  const serverUrl = configStore.envConfig.serverUrl
  const authStore = useAuthStore()
  const { isLogged } = storeToRefs(authStore)

  await axios.
    put(serverUrl + 'game/', game)
    .catch(err => {
      if (err.response.data.code === 401) {
        isLogged.value = false
      }
      // TODO: Gesionar este error
      console.log(err)
    })
}
