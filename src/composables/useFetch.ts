import { useConfigStore } from '@/stores/config'
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
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}`)
      }
      data.value = await res.json()
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
