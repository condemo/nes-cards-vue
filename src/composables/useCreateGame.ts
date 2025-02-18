import type { GameSetup } from '@/types/game'
import axios from 'axios'
import { ref, type Ref, type UnwrapRef } from 'vue'

export const useCreateGame = (game: GameSetup): Ref<UnwrapRef<string>> => {
  const errMsg = ref('')
  if (game.player1?.name === game.player2?.name) {
    errMsg.value = "player names can't be equal"
    return errMsg
  }

  axios.
    post(import.meta.env.VITE_SERVER_URL + "/game/", game)
    .then(res => {
      /* TODO: cambiar de vista a `game` pasandole el game actualizado */
    })
    .catch(e => {
      errMsg.value = "server error -> " + e
      return errMsg
    })

  return errMsg
}
