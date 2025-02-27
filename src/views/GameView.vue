<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <div v-else-if="currentGame" id="current-game" class="flex flex-col mx-1">
      <div id="players-stats" class="flex flex-row justify-evenly m-2 w-full p-1 mx-auto">
        <PlayerStat :player="currentGame.player1" :player-stats="currentGame.p1stats" @open-update-modal="openModal" />
        <PlayerStat :player="currentGame.player2" :player-stats="currentGame.p2stats" @open-update-modal="openModal" />
      </div>
    </div>
    <div v-else id="empty-view">
      <img src="/img/empty_meme.jpeg" class="w-56 mx-auto" />
      <h1 class="text-3xl font-bold my-2">There is no game yet</h1>
    </div>
    <GameUpdateModal @close-update-modal="updateModal = false" v-if="updateModal" :current-section="updateSection" />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PlayerStat from '@/components/PlayerStat.vue'
import GameUpdateModal from '@/components/game/GameUpdateModal.vue'
import { ref } from 'vue'

const gameStore = useGameStore()
const updateSection = ref<string>('')
const updateModal = ref<boolean>(false)

const { currentGame, loading } = storeToRefs(gameStore)
if (!currentGame.value) {
  gameStore.setLastGame()
}

const openModal = (title: string) => {
  updateModal.value = true
  updateSection.value = title
}

</script>
