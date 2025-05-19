import { defineStore } from "pinia";
import { shallowReactive, watchEffect } from "vue";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isLogged = ref<boolean>(
    JSON.parse(localStorage.getItem("isLogged") || 'false')
  )

  const authTokens = shallowReactive(
    JSON.parse(localStorage.getItem("authTokens") || JSON.stringify({
      token: "",
      refreshToken: ""
    }))
  )

  const authorizationHeader = `Bearer ${authTokens.token}`
  const refreshHeader = `Bearer ${authTokens.refreshToken}`

  watchEffect(async () => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged.value))
  })

  watchEffect(async () => {
    localStorage.setItem('authTokens', JSON.stringify(authTokens))
  })

  return {
    isLogged,
    authorizationHeader,
    refreshHeader,
    authTokens,
  }
})
