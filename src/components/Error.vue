<template>
  <div>
    <p>{{ error.message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: { type: Error, required: true }
})
</script>
