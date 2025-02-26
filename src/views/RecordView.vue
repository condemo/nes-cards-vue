<template>
  <div>
    <div class="flex flex-col space-y-3">
      <h1 class="text-4xl font-bold">Records</h1>
      <LoadingSpinner v-if="loading" />
      <ErrorMessage :error="error" v-else-if="error" />
      <GameRecordCard v-else-if="data" v-for="g in data" :key="g.id" :game="g" />
      <div id="empty-history" v-else>
        <img src="/img/why_is_empty.png" class="w-56 mx-auto" />
        <h1 class="text-3xl font-bold my-2">Play some games or what</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import type { Game } from '@/types/game'
import GameRecordCard from '@/components/GameRecordCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const { data, error, loading } = useFetch<Game[]>('/game/')
</script>
