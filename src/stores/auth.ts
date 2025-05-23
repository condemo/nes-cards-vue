import axios from "axios";
import { defineStore } from "pinia";
import { computed, shallowReactive, watchEffect } from "vue";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isLogged = ref<boolean>(
    JSON.parse(localStorage.getItem("isLogged") || 'false')
  )

  const authTokens = shallowReactive({
    token: '',
    refreshToken: ''
  })

  authTokens.token = localStorage.getItem("token") || ""
  authTokens.refreshToken = localStorage.getItem("refreshToken") || ""
  axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.token}`

  watchEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged.value))
  })

  watchEffect(() => {
    localStorage.setItem('token', authTokens.token)
  })

  watchEffect(() => {
    localStorage.setItem('refreshToken', authTokens.refreshToken)
  })

  return {
    isLogged,
    authTokens,
  }
})
