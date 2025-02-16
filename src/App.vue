<script setup lang="ts">
import BottomNav from '@/components/BottomNav.vue'
</script>

<template>
  <div>
    <div id="main-container" class="flex flex-col mx-auto text-center h-screen px-1">
      <RouterView />
      <BottomNav />
    </div>
  </div>
</template>
