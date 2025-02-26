<template>
  <div>
    <Loading v-if="loading" />
    <div v-else-if="currentGame" id="current-game" class="flex flex-col mx-1">
      <div id="players-stats" class="flex flex-row justify-evenly m-2 w-full p-1 mx-auto">
        <PlayerStat :player="currentGame.player1" :player-stats="currentGame.p1stats" />
        <PlayerStat :player="currentGame.player2" :player-stats="currentGame.p2stats" />
      </div>
    </div>
    <div v-else id="empty-view">
      <img src="/img/empty_meme.jpeg" class="w-56 mx-auto" />
      <h1 class="text-3xl font-bold my-2">There is no game yet</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import Loading from '@/components/Loading.vue'
import PlayerStat from '@/components/PlayerStat.vue'

const gameStore = useGameStore()
const { currentGame, loading } = storeToRefs(gameStore)
if (!currentGame.value) {
  gameStore.setLastGame()
}
</script>
