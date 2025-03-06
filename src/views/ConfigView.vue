<template>
  <div>
    <h1 class="text-4xl font-bold">Config</h1>

    <fieldset class="fieldset border border-primary rounded-box">
      <legend class="fieldset-legend text-3xl text-primary">UI</legend>
      <label class="select select-secondary mx-auto">
        <span class="label">Theme</span>
        <select v-model="selectedTheme">
          <option v-for="(theme, index) in themeList" :value="theme.value" :key="index">{{ theme.name }}</option>
        </select>
      </label>
      <p class="fieldset-label mx-auto">All related to User Interface</p>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config';
import { ref, watchEffect } from 'vue';

const configStore = useConfigStore()
const themeList = configStore.themeList
const selectedTheme = ref(themeList[0].value)

watchEffect(async () => {
  configStore.setTheme(selectedTheme.value)
})
</script>
