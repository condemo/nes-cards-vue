<template>
  <div>
    <h1 class="text-4xl font-bold">Config</h1>
    <div id="config-section">
      <UIConfig />
      <p>...</p>
      <DataConfig />
      <GameConfig />
    </div>
  </div>
</template>

<script setup lang="ts">
import UIConfig from '@/components/config/UIConfig.vue'
import DataConfig from '@/components/config/DataConfig.vue'
import GameConfig from '@/components/config/GameConfig.vue'
</script>
