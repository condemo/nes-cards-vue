<template>
  <div>
    <h1 class="text-4xl font-bold">Config</h1>
    <img @load="isLoaded = true" class="py-5 mx-auto"
      src="https://pbs.twimg.com/media/E8c6-2pWYAEAjRG?format=jpg&name=medium" alt="no lo hice">
    <Loading v-if="!isLoaded" />
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import { ref } from 'vue';

const isLoaded = ref<boolean>(false)
</script>
