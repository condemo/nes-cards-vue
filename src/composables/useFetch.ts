import { useAuthStore } from '@/stores/auth'
import { useConfigStore } from '@/stores/config'
import type { Player } from '@/types/game'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { ref, type Ref, type UnwrapRef } from 'vue'

type ApiResponse<T> = {
  data: Ref<UnwrapRef<T> | null>
  error: Ref<UnwrapRef<Error> | null>
  loading: Ref<boolean>
}

export function useFetch<T>(endpoint: string): ApiResponse<T> {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref<boolean>(false)
  const configStore = useConfigStore()
  const url = configStore.envConfig.serverUrl + endpoint
  const baseUrl = configStore.envConfig.serverBase
  const authStore = useAuthStore()
  const { isLogged, authorizationHeader, refreshHeader } = storeToRefs(authStore)

  const fetchData = async () => {
    try {
      loading.value = true
      await axios.get(url, {
        headers: {
          "Authorization": authorizationHeader.value,
        }
      })
        .then(res => {
          data.value = res.data
        })
        .catch(async err => {
          if (err.response.data.code === 401) {
            await axios.post(baseUrl + '/auth/refresh', {}, {
              headers: {
                "Authorization": refreshHeader.value,
              }
            })
              .then(res => {
                data.value = res.data as Player[]
              })
              .catch(err => {
                if (err.response.data.code === 401) {
                  isLogged.value = false
                }
              })
          }
        })

    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }
  fetchData()

  return {
    data,
    error,
    loading,
  }
}
