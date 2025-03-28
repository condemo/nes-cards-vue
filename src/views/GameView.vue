<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <div v-else-if="currentGame" id="current-game" class="flex flex-col mx-1">
      <h1 class="text-2xl">Round: {{ roundCount }}</h1>
      <div id="players-stats" class="flex flex-row justify-evenly m-2 w-full p-1 mx-auto">
        <PlayerStat :player-position="PlayerTurn.Player1" :player="currentGame.player1"
          :player-stats="currentGame.p1stats" @open-update-modal="openModal" />
        <PlayerStat :player-position="PlayerTurn.Player2" :player="currentGame.player2"
          :player-stats="currentGame.p2stats" @open-update-modal="openModal" />
      </div>
      <!-- TODO: Resume Section... -->
      <button @click="nextTurn" class="btn btn-primary text-xl font-bold">Next Turn</button>
    </div>
    <div v-else id="empty-view">
      <img src="/img/empty_meme.jpeg" class="w-56 mx-auto" />
      <h1 class="text-3xl font-bold my-2">There is no game yet</h1>
    </div>
    <GameUpdateModal @close-update-modal="closeUpdateModal" :current-section="updateSection" :open="updateModal">
      <AlteredForm v-if="updateSection === UpdateMode.AlteredEffect" />
      <DamageForm :player-turn="currentPlayerTurn" v-else-if="updateSection === UpdateMode.Damage"
        @close-update-modal="closeUpdateModal" />
      <DefenseForm v-else="updateSection === UpdateMode.Defense" />
    </GameUpdateModal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PlayerStat from '@/components/PlayerStat.vue'
import GameUpdateModal from '@/components/game/GameUpdateModal.vue'
import { PlayerTurn, UpdateMode } from '@/types/game'
import AlteredForm from '@/components/game/forms/AlteredForm.vue'
import DamageForm from '@/components/game/forms/DamageForm.vue'
import DefenseForm from '@/components/game/forms/DefenseForm.vue'
import { ref } from 'vue'
import { useGameDataStore } from '@/stores/gameData'
import { useGameHandlerStore } from '@/stores/gameHandler'

const gameDataStore = useGameDataStore()
const gameHandlerStore = useGameHandlerStore()
const { roundCount, currentPlayerTurn } = storeToRefs(gameHandlerStore)
const updateSection = ref<UpdateMode>(UpdateMode.Damage)
const updateModal = ref<boolean>(false)

const { currentGame, loading } = storeToRefs(gameDataStore)
if (!currentGame.value) {
  gameDataStore.setLastGame()
}

const nextTurn = () => {
  gameHandlerStore.nextTurn()
}

const closeUpdateModal = () => {
  updateModal.value = false
}

const openModal = (mode: UpdateMode) => {
  updateModal.value = true
  updateSection.value = mode
}

</script>
