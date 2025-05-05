<template>
  <div>
    <h1 class="text-4xl font-bold">Config</h1>
    <div id="config-section">
      <UIConfig />
      <p>...</p>
      <DataConfig />
      <GameConfig />
    </div>
    <router-link to="/about">
      <button class="btn btn-primary btn-circle fixed right-3 bottom-16 w-14 h-14">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
      </button>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import UIConfig from '@/components/config/UIConfig.vue'
import DataConfig from '@/components/config/DataConfig.vue'
import GameConfig from '@/components/config/GameConfig.vue'
</script>
