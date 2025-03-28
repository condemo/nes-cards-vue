<template>
  <div>
    <h3 class="text-3xl font-bold mb-5">{{ title }}</h3>
    <slot>
      <LoadingSpinner />
    </slot>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
defineProps({
  title: { type: String, required: true }
})
</script>
