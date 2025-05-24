import axios from "axios";
import { defineStore } from "pinia";
import { shallowReactive, watchEffect } from "vue";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isLogged = ref<boolean>(
    JSON.parse(localStorage.getItem("isLogged") || 'false')
  )
  const token = ref<string>('')
  const refreshToken = ref<string>('')

  const authTokens = shallowReactive({
    token: '',
    refreshToken: ''
  })

  token.value = localStorage.getItem("token") || ""
  refreshToken.value = localStorage.getItem("refreshToken") || ""
  axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.token}`

  watchEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged.value))
  })

  watchEffect(() => {
    localStorage.setItem('token', token.value)
  })

  watchEffect(() => {
    localStorage.setItem('refreshToken', refreshToken.value)
  })

  return {
    isLogged,
    refreshToken,
    token,
  }
})
