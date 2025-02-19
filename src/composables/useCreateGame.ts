import type { GameSetup } from '@/types/game'
import axios from 'axios'

export const useCreateGame = (game: GameSetup): void => {
  axios.
    post(import.meta.env.VITE_SERVER_URL + "/game/", game)
    .then(res => {
      /* TODO: cambiar de vista a `game` pasandole el game actualizado */
    })
    .catch(e => {
      console.log(e as Error)
    })
}
