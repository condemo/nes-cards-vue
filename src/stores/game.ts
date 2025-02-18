import { defineStore } from "pinia";
import type { Game } from '@/types/game'
import { ref } from "vue";
import axios from "axios";

export const useGameStore = defineStore('game', () => {
  let currentGame = ref<Game | null>(null)

  const fetchLastGame = () => {
    axios.
      get(import.meta.env.VITE_SERVER_URL + "/game/last")
      .then(res => {
        currentGame.value = res.data
        console.log(currentGame.value)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return {
    currentGame,
    fetchLastGame,
  }
})
