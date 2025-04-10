<template>
  <div id="defense-form" class="flex flex-col space-y-2 w-full">
    <div class="flex flex-row space-x-5 mx-auto text-2xl">
      <label>DEF:</label>
      <button class="btn btn-circle btn-secondary" @click="defCount--">-</button>
      <label @click="defCount = 0">{{ defCount }}</label>
      <button class="btn btn-circle btn-secondary" @click="defCount++">+</button>
      <button class="btn btn-success" @click="addtoDef">Add</button>
    </div>
    <p>new def:{{ defList }}</p>
    <div class="flex flex-row justify-around p-2 mt-2">
      <button class="btn btn-error w-1/6" @click="reset">reset</button>
      <button class="btn btn-primary w-4/6" @click="save">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useGameHandlerStore } from '@/stores/gameHandler';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const emits = defineEmits(['close-update-modal'])

const gameHandlerStore = useGameHandlerStore()
const { currentPlayerTurn, turnMode } = storeToRefs(gameHandlerStore)

const defList = ref<number[]>([])
const defCount = ref<number>(0)

const reset = () => {
  defList.value.splice(0);
  defCount.value = 0
}

const addtoDef = () => {
  if (defCount.value > 0) {
    defList.value.push(defCount.value)
  }
  defCount.value = 0
}

watch(() => currentPlayerTurn.value, () => {
  reset()
})

watch(() => turnMode.value, () => {
  reset()
})

const save = () => {
  if (defList.value.length > 0) {
    gameHandlerStore.updateDEF(defList.value)
  }
  reset()
  emits('close-update-modal')
}

</script>
