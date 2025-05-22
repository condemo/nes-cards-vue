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
  console.log("auth things loaded")

  const authorizationHeader = computed(() => {
    return {
      Authorization: `Bearer ${authTokens.token}`,
    }
  })

  const refreshHeader = computed(() => {
    return {
      Authorization: `Bearer ${authTokens.refreshToken}`
    }
  })

  watchEffect(async () => {
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
    authorizationHeader,
    refreshHeader,
    authTokens,
  }
})
