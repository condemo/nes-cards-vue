<template>
  <div class="flex flex-col space-y-3">
    <div class="stats shadow w-40">
      <div @click="playerMenu = !playerMenu" class="stat">
        <div class="stat-title text-black text-xl font-bold">{{ player?.name }}</div>
        <div class="flex flex-row justify-items-center text-primary mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8">
            <path
              d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
          <p class="font-bold text-3xl">{{ playerStats?.hp }}</p>
        </div>
      </div>
    </div>
    <UpdateMenu v-show="playerMenu" :player="true" @open-update-modal="openUpdateModal" />
    <div class="divider"></div>
    <TowerStat :thp="playerStats?.t1hp" @open-update-modal="openUpdateModal" />
    <TowerStat :thp="playerStats?.t2hp" @open-update-modal="openUpdateModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { Player, PlayerStats } from '@/types/game'
import TowerStat from './TowerStat.vue'
import UpdateMenu from './game/UpdateMenu.vue';

defineProps({
  player: {
    type: Object as PropType<Player>,
  },
  playerStats: {
    type: Object as PropType<PlayerStats>,
  },
})

const emit = defineEmits(['open-update-modal'])
const playerMenu = ref<boolean>(false)

const openUpdateModal = (title: string) => {
  emit('open-update-modal', title)
}
</script>
