<template>
  <div class="flex flex-col space-y-3 hover:cursor-pointer">
    <div class="stats shadow w-40 bg-neutral" :class="[
      { 'border-4': playerMenu },
      turnMode === TurnMode.Attack
        ? 'border-primary'
        : 'border-secondary'
    ]">
      <div class="stat">
        <div class="stat-title text-accent text-xl font-bold">{{ player?.name }}</div>
        <div class="flex flex-row justify-items-center text-primary mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8">
            <path
              d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
          <p class="font-bold text-3xl">{{ playerStats?.hp }}</p>
        </div>
      </div>
    </div>
    <div class="font-bold">
      <p>
        <span>ST:{{ playerStats?.strength }}</span>
        |
        <span>IN:{{ playerStats?.intangible }}</span>
        |
        <span>CON:{{ playerStats?.confusion }}</span>
      </p>
    </div>
    <UpdateMenu v-show="playerMenu" :player="true" @open-update-modal="openUpdateModal" />
    <div class="divider"></div>
    <!-- TODO: Hacer dinámico la carga de defensas -->
    <TowerStat :thp="playerStats?.t1hp" @open-update-modal="openUpdateModal" />
    <TowerStat :thp="playerStats?.t2hp" :defs="playerStats?.defenses" @open-update-modal="openUpdateModal" />
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { Player, PlayerStats, PlayerTurn } from '@/types/game'
import TowerStat from './TowerStat.vue'
import UpdateMenu from './game/UpdateMenu.vue';
import { TurnMode, UpdateMode } from '@/types/game'
import { useGameHandlerStore } from '@/stores/gameHandler';
import { storeToRefs } from 'pinia';

const props = defineProps({
  player: {
    type: Object as PropType<Player>,
  },
  playerStats: {
    type: Object as PropType<PlayerStats>,
  },
  playerPosition: { type: Number as PropType<PlayerTurn>, required: true }
})

const gameHandlerStore = useGameHandlerStore()
const { currentPlayerTurn, turnMode } = storeToRefs(gameHandlerStore)

const emit = defineEmits(['open-update-modal'])
const playerMenu = computed(() => {
  return currentPlayerTurn.value === props.playerPosition
})

const openUpdateModal = (mode: UpdateMode) => {
  emit('open-update-modal', mode)
}
</script>
