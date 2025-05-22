import { useConfigStore } from '@/stores/config'
import axios from 'axios'
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

  const fetchData = async () => {
    try {
      loading.value = true
      await axios.get(url)
        .then(res => {
          data.value = res.data
        })
        .catch(err => {
          error.value = err as Error
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
