<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <div v-else-if="currentGame" id="current-game" class="flex flex-col mx-1">
      <h1 class="text-2xl">Round: {{ roundCount }}</h1>
      <div id="players-stats" class="flex flex-row justify-evenly m-2 w-full p-1 mx-auto">
        <PlayerStat
          :player-position="PlayerTurn.Player1"
          :player="currentGame.player1"
          :player-stats="currentGame.p1stats"
          @open-update-modal="openUpdateModal"
        />
        <PlayerStat
          :player-position="PlayerTurn.Player2"
          :player="currentGame.player2"
          :player-stats="currentGame.p2stats"
          @open-update-modal="openUpdateModal"
        />
      </div>
      <button @click="nextTurn" class="btn btn-primary text-xl font-bold">Next Turn</button>
      <MoveResumeSection />
    </div>
    <div v-else id="empty-view">
      <img src="/img/empty_meme.jpeg" class="w-56 mx-auto" />
      <h1 class="text-3xl font-bold my-2">There is no game yet</h1>
    </div>
    <WinModal v-if="currentGame?.winner !== 'none' && currentGame" :winner="currentGame?.winner" />
    <GameUpdateModal
      @close-update-modal="closeUpdateModal"
      :current-section="updateSection"
      :open="updateModal"
    >
      <DamageForm
        v-if="updateSection === UpdateMode.Damage"
        @close-update-modal="closeUpdateModal"
      />
      <StatsForm
        v-else-if="updateSection === UpdateMode.Stats"
        @close-update-modal="closeUpdateModal"
      />
      <DefenseForm
        v-else-if="updateSection === UpdateMode.Defense"
        :update-menu="true"
        @close-update-modal="closeUpdateModal"
      />
      <RivalForm v-else @close-update-modal="closeUpdateModal" />
    </GameUpdateModal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PlayerStat from '@/components/PlayerStat.vue'
import GameUpdateModal from '@/components/game/GameUpdateModal.vue'
import { PlayerTurn, UpdateMode } from '@/types/game'
import DamageForm from '@/components/game/forms/DamageForm.vue'
import StatsForm from '@/components/game/forms/StatsForm.vue'
import DefenseForm from '@/components/game/forms/DefenseForm.vue'
import RivalForm from '@/components/game/forms/RivalForm.vue'
import MoveResumeSection from '@/components/game/MoveResumeSection.vue'
import { onBeforeMount, ref } from 'vue'
import { useGameDataStore } from '@/stores/gameData'
import { useGameHandlerStore } from '@/stores/gameHandler'
import WinModal from '@/components/WinModal.vue'

const gameDataStore = useGameDataStore()
const gameHandlerStore = useGameHandlerStore()
const { roundCount } = storeToRefs(gameHandlerStore)
const updateSection = ref<UpdateMode>(UpdateMode.Damage)
const updateModal = ref<boolean>(false)

const props = defineProps({
  fromNavigation: { type: Boolean },
})

const { currentGame, loading } = storeToRefs(gameDataStore)
onBeforeMount(async () => {
  if (!currentGame.value) {
    await gameDataStore.setLastGame()
    gameHandlerStore.loadDataFromGame()
  } else {
    if (!props.fromNavigation) {
      gameHandlerStore.loadDataFromGame()
    }
  }
})

const nextTurn = () => {
  gameHandlerStore.nextTurn()
}

const closeUpdateModal = () => {
  updateModal.value = false
}

const openUpdateModal = (mode: UpdateMode) => {
  updateModal.value = true
  updateSection.value = mode
}
</script>
