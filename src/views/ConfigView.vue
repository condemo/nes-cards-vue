<template>
  <div>
    <h1 class="text-4xl font-bold">Config</h1>
    <img @load="isLoaded = true" class="py-5 mx-auto"
      src="https://pbs.twimg.com/media/E8c6-2pWYAEAjRG?format=jpg&name=medium" alt="no lo hice" />
    <LoadingSpinner v-if="!isLoaded" />
  </div>@/components/LoadingSpinner.vue
</template>

<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { ref } from 'vue'

const isLoaded = ref<boolean>(false)
</script>
