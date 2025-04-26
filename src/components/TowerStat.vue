<template>
  <div>
    <div @click="openModal" class="stats shadow w-28 h-24 rounded-full mx-auto bg-base-300">
      <div class="stat shadow-2xl" :class="colors.bg">
        <div class="flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6"
            :class="colors.text">
            <path fill-rule="evenodd"
              d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
              clip-rule="evenodd"></path>
          </svg>
          <div class="stat-value text-3xl font-bold" :class="colors.text">{{ thp }}</div>
        </div>
      </div>
    </div>
    <DefensesContainer :defs="defs" />
  </div>
</template>

<script setup lang="ts">
import type { Defense } from '@/game/game';
import { useGameHandlerStore } from '@/stores/gameHandler';
import { PlayerTurn, UpdateMode } from '@/types/game';
import { storeToRefs } from 'pinia';
import { computed, reactive, type PropType } from 'vue';
import DefensesContainer from './partials/DefensesContainer.vue';

const emits = defineEmits(['open-update-modal'])

const props = defineProps({
  thp: { type: Number },
  defs: { type: Array as PropType<Defense[]> },
  playerPosition: { type: Number as PropType<PlayerTurn>, required: true }
})

const gameHandler = useGameHandlerStore()
const { currentPlayerTurn } = storeToRefs(gameHandler)

const checkHP = computed(() => {
  if (props.thp) {
    if (props.thp > 0) {
      return true
    }
  }
  return false
})

const openModal = () => {
  if (props.playerPosition === currentPlayerTurn.value && props.thp || 0 > 0)
    emits('open-update-modal', UpdateMode.Defense)
}

const colors = reactive({
  bg: checkHP.value ? 'bg-neutral' : 'bg-base-100',
  text: checkHP.value ? 'text-neutral-content' : 'text-base-300',

})


</script>
