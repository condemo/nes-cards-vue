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
    <div class="flex flex-row space-x-1 justify-center w-2/3 mx-auto font-bold">
      <div class="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd"
            d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
            clip-rule="evenodd" />
        </svg>
        <span>{{ playerStats?.strength }}</span>
      </div>
      <div class="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path
            d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 0 1 2.25 0v10.937a4.505 4.505 0 0 0-3.25 2.373 8.963 8.963 0 0 1 4-.935A.75.75 0 0 0 18 15v-2.266a3.368 3.368 0 0 1 .988-2.37 1.125 1.125 0 0 1 1.591 1.59 1.118 1.118 0 0 0-.329.79v3.006h-.005a6 6 0 0 1-1.752 4.007l-1.736 1.736a6 6 0 0 1-4.242 1.757H10.5a7.5 7.5 0 0 1-7.5-7.5V6.375a1.125 1.125 0 0 1 2.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 0 1 2.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875Z" />
        </svg>
        <span>{{ playerStats?.intangible }}</span>
      </div>
      <div class="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd"
            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
            clip-rule="evenodd" />
        </svg>
        <span> {{ playerStats?.confusion }}</span>
      </div>
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
