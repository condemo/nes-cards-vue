<template>
  <div>
    <fieldset class="fieldset border border-primary rounded-box">
      <legend class="fieldset-legend text-3xl text-primary">UI</legend>
      <label class="select select-secondary mx-auto">
        <span class="label">Theme</span>
        <select v-model="currentTheme" class="hover:cursor-pointer">
          <option v-for="(theme, index) in themeList" :value="theme.value" :key="index">{{ theme.name }}</option>
        </select>
      </label>
      <p class="fieldset-label mx-auto">All related to User Interface</p>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config';
import { storeToRefs } from 'pinia';

const configStore = useConfigStore()
const themeList = configStore.themeList
const { currentTheme } = storeToRefs(configStore)


</script>
