<template>
  <div>
    <div class="flex flex-col space-y-3">
      <h1 class="text-4xl font-bold">Record View</h1>
      <GameRecordCard v-for="g in data" :key="g.id" :game="g" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import type { Game } from '@/types/game';
import GameRecordCard from '@/components/GameRecordCard.vue';

const { data } = useFetch<Game[]>("/game/")
</script>
