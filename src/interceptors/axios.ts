import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { storeToRefs } from "pinia";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE

axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const { authTokens } = storeToRefs(authStore)
    const token = authTokens.value.token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const authStore = useAuthStore()
    const { authTokens, isLogged } = storeToRefs(authStore)
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 || error.response.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true
    }

    try {
      const response = await axios.get("auth/refresh", {
        headers: {
          Authorization: `Bearer ${authTokens.value.refreshToken}`
        }
      })

      if (response) {
        authTokens.value.token = response.data.access_token
        originalRequest.headers["Authorization"] = `Bearer ${response.data.access_token}`
        isLogged.value = true
        return axios(originalRequest)
      }
    } catch (err) {
      isLogged.value = false
      router.push({ name: "login" })
      return Promise.reject("Unauthorized")
    }
    return Promise.reject(error)
  }
)
