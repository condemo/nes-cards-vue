<template>
  <div>
    <h3 class="text-3xl font-bold">{{ title }}</h3>
    <p>content</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true }
})
</script>
