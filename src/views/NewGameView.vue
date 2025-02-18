<template>
  <div id="new-game">
    <div>
      <h1 class="text-4xl">New Game</h1>
      <router-link to="/">
        <button class="btn btn-square btn-outline fixed top-2 right-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </router-link>
      <div id="game-form" class="flex flex-col my-5">
        <div class="flex flex-row justify-evenly">
          <select v-model="game.player1" class="select select-primary w-2/5 max-w-xs">
            <option v-for="p in playerList" :value="p" :key="p.id" :selected="p.name === 'Player1' ? true : false">{{
              p.name }}</option>
          </select>
          <select v-model="game.player2" class="select select-primary w-2/5 max-w-xs">
            <option v-for="p in playerList" :value="p" :key="p.id" :selected="p.name === 'Player2' ? true : false">{{
              p.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col mx-auto mt-2 space-y-2">
          <label class="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z">
              </path>
            </svg>
            <input v-model.number="game.playerHP" autocomplete="off" type="number" class="grow" name="player-hp"
              placeholder="Players HP (80) {0..255}" />
          </label>
          <label class="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21">
              </path>
            </svg>
            <input v-model.number="game.towerHP" autocomplete="off" type="number" class="grow" name="tower-hp"
              placeholder="Towers HP (60) {0..255}" />
          </label>
        </div>
      </div>
      <p v-if="errorMsg !== '' ? true : false">{{ errorMsg }}</p>
      <button @click="createGame" class="btn btn-primary text-2xl"
        :disabled="!game.player1 || !game.player2">Play!</button>
    </div>
    <div class="divider"></div>
    <button class="btn btn-primary fixed right-2 bottom-20" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z">
        </path>
      </svg>
    </button>
    <div class="my-2">
      <h2 class="text-2xl">Current Setup</h2>
      <div class="mx-auto">
        <p>{{ game.player1?.name }} VS {{ game.player2?.name }}</p>
      </div>
      <p>Player HP: {{ game.playerHP }} (80)</p>
      <p>Tower HP: {{ game.towerHP }} (60)</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { GameSetup, Player } from '@/types/game'
import { useFetch } from '@/composables/useFetch';
import { useCreateGame } from '@/composables/useCreateGame';

const { data: playerList } = useFetch<Player[]>("/player/")

const game = reactive<GameSetup>({
  player1: undefined,
  player2: undefined,
  towerHP: undefined,
  playerHP: undefined
})

let errorMsg = ref('')

const createGame = () => {
  errorMsg = useCreateGame(game)
}

</script>
