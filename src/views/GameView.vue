<template>
  <div>
    <h1 class="text-4xl font-bold m-1">GameView</h1>
    <Loading v-if="loading" />
    <div v-else-if="currentGame" id="current-game" class="flex flex-col space-y-2">
      <div id="players-stats" class="flex flex-row">
        <p>{{ currentGame?.player1.name }}</p>
        <p>{{ currentGame?.player2.name }}</p>
      </div>
    </div>
    <div v-else id="empty-view">
      <img src="/img/empty_meme.jpeg" class="w-56 mx-auto" />
      <h1 class="text-3xl font-bold my-2">There is no game yet</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { storeToRefs } from 'pinia';
import Loading from '@/components/Loading.vue';

const gameStore = useGameStore()
const { currentGame, loading } = storeToRefs(gameStore)
if (!currentGame.value) {
  gameStore.setLastGame()
}
</script>
