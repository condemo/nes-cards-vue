<template>
  <div class="flex flex-col space-y-3">
    <div class="stats shadow w-40">
      <div class="stat">
        <div class="stat-title text-black text-xl font-bold">{{ player?.name }}</div>
        <div class="stat-value text-primary">{{ playerStats?.hp }}</div>
      </div>
    </div>
    <div class="divider"></div>
    <TowerStat :thp="playerStats?.t1hp" />
    <TowerStat :thp="playerStats?.t2hp" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Player, PlayerStats } from '@/types/game';
import TowerStat from './TowerStat.vue'

defineProps({
  player: {
    type: Object as PropType<Player>,
  },
  playerStats: {
    type: Object as PropType<PlayerStats>
  }
})
</script>
