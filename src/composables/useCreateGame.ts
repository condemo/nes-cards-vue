import { useGameStore } from '@/stores/game'
import type { Game, GameSetup } from '@/types/game'
import axios from 'axios'


export const useCreateGame = (game: GameSetup): void => {
  const gameStore = useGameStore()
  axios.
    post(import.meta.env.VITE_SERVER_URL + "/game/", game)
    .then(res => {
      gameStore.setCurrentGame(res.data as Game)
    })
    .catch(e => {
      console.log(e as Error)
    })
}
