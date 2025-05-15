import { defineStore } from "pinia";
import { watchEffect } from "vue";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isLogged = ref<boolean>(false)

  const loadLoginStatus = () => {
    isLogged.value = JSON.parse(localStorage.getItem("isLogged") || 'false')
  }

  watchEffect(async () => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged))
  })

  return {
    loadLoginStatus,
    isLogged,
  }
})
