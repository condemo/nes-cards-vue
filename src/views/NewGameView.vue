<template>
  <div id="new-game">
    <div>
      <h1 class="text-4xl">New Game</h1>
      <router-link to="/">
        <button class="btn btn-square btn-outline fixed top-2 right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </router-link>
      <div id="game-form" class="flex flex-col my-5">
        <div class="flex flex-row justify-evenly">
          <select v-model="game.player1" class="select select-primary w-2/5 max-w-xs">
            <option
              v-for="p in playerList"
              :value="p"
              :key="p.id"
              :selected="p.name === 'Player1' ? true : false"
            >
              {{ p.name }}
            </option>
          </select>
          <button @click="showModal = true" class="btn bg-base-300" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              ></path>
            </svg>
          </button>
          <select v-model="game.player2" class="select select-secondary w-2/5 max-w-xs">
            <option
              v-for="p in playerList"
              :value="p"
              :key="p.id"
              :selected="p.name === 'Player2' ? true : false"
            >
              {{ p.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col mx-auto mt-2 space-y-2">
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              ></path>
            </svg>
            <input
              v-model.number="game.playerHP"
              autocomplete="off"
              type="number"
              class="grow"
              name="player-hp"
              placeholder="Players HP (80) {0..255}"
            />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              ></path>
            </svg>
            <input
              v-model.nu?mber="game.towerHP"
              autocomplete="off"
              type="number"
              class="grow"
              name="tower-hp"
              placeholder="Towers HP (60) {0..255}"
            />
          </label>
        </div>
      </div>
      <p class="text-error">{{ errorMsg }}</p>
      <button
        @click="createGame"
        class="btn btn-primary text-2xl"
        :disabled="!game.player1 || !game.player2 || game.player1.name === game.player2.name"
      >
        Play!
      </button>
    </div>
    <div class="divider"></div>
    <div class="mb-2 font-bold">
      <h2 class="text-4xl text-base-content font-[Phudu] font-semibold underline mb-2">
        Current Setup
      </h2>
      <div id="current-setup" class="mx-auto flex flex-col space-y-2">
        <div id="player-names">
          <p class="font-bold text-2xl">
            <span class="text-primary">{{ game.player1?.name }}</span>
            <span class="text-3xl"> |VS|</span>
            <span class="text-secondary">{{ game.player2?.name }}</span>
          </p>
        </div>
        <div id="game-p-hp" class="flex flex-row justify-center text-4xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-10 text-error"
          >
            <path
              d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
            />
          </svg>
          <p>: {{ game.playerHP }} <span class="text-base-200">(80)</span></p>
        </div>
      </div>
      <div id="game-t-hp" class="flex flex-row justify-center text-4xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-10 text-neutral"
        >
          <path
            fill-rule="evenodd"
            d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p>: {{ game.towerHP }} <span class="text-base-200">(60)</span></p>
      </div>
    </div>
    <NewPlayerModal
      v-if="showModal"
      :error-msg="newPlayerError"
      @user-create="addPlayer"
      @close-modal="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { GameSetup, Player } from '@/types/game'
import type { ApiError } from '@/types/apiCom'
import { useFetch } from '@/composables/useFetch'
import { useCreateGame } from '@/composables/useCreateGame'
import { useRouter } from 'vue-router'
import NewPlayerModal from '@/components/NewPlayerModal.vue'
import axios, { AxiosError } from 'axios'

const router = useRouter()
const { data: playerList } = useFetch<Player[]>('/player/')

const game = reactive<GameSetup>({
  player1: undefined,
  player2: undefined,
  towerHP: undefined,
  playerHP: undefined,
})

const errorMsg = ref<string>('')
const newPlayerError = ref<string>('')
const showModal = ref<boolean>(false)

const closeModal = () => {
  showModal.value = false
  newPlayerError.value = ''
}

const addPlayer = async (name: string) => {
  await axios
    .post(import.meta.env.VITE_SERVER_URL + '/player/', { name: name })
    .then((res) => {
      playerList.value?.push(res.data as Player)
      closeModal()
      newPlayerError.value = ''
    })
    .catch((e) => {
      console.log(e)
      const errRes = (e as AxiosError).response?.data
      const { error } = errRes as ApiError
      newPlayerError.value = error
    })
}

const createGame = () => {
  useCreateGame(game)
  router.replace('/game')
}
</script>
