<template>
  <dialog id="hp-modal" class="modal modal-center" :class="{ 'modal-open': open }">
    <div class="modal-box">
      <h1 class="mb-4 text-3xl">Modify HP</h1>
      <div class="flex flex-row justify-center items-center space-x-3 my-2">
        <button class="btn btn-circle btn-secondary" @click="demoCount -= 10">-10</button>
        <button class="btn btn-circle btn-secondary" @click="demoCount -= 1">-1</button>
        <div class="text-2xl">{{ demoCount }}</div>
        <button class="btn btn-circle btn-secondary" @click="demoCount += 1">+1</button>
        <button class="btn btn-circle btn-secondary" @click="demoCount += 10">+10</button>
      </div>
      <template v-if="defActive">
        <div class="flex flex-row justify-center items-center space-x-4 mx-auto text-2xl">
          <button class="btn btn-error w-1/6" @click="resetDefs">reset</button>
          <label class="text-2xl">DEF:</label>
          <button class="btn btn-circle btn-secondary" @click="defCount--">-</button>
          <label @click="defCount = 0">{{ defCount }}</label>
          <button class="btn btn-circle btn-secondary" @click="defCount++">+</button>
          <button class="btn btn-success" @click="addtoDef">Add</button>
        </div>
        <p class="my-2">new def:{{ defList }}</p>
      </template>
      <button class="btn btn-primary" @click="saveHP">Save</button>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="close">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { useGameHandlerStore } from '@/stores/gameHandler'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

defineProps({
  open: { type: Boolean },
  defActive: { type: Boolean }
})

const gameHandler = useGameHandlerStore()
const { currentPlayerHP } = storeToRefs(gameHandler)

const emits = defineEmits(['close-hp-modal'])
const demoCount = ref<number>(currentPlayerHP.value || 0)
const defList = ref<number[]>([])
const defCount = ref<number>(0)

watch(currentPlayerHP, () => {
  demoCount.value = currentPlayerHP.value || 0
})

const addtoDef = () => {
  if (defCount.value > 0) {
    defList.value.push(defCount.value)
  }
  defCount.value = 0
}

const close = () => {
  emits('close-hp-modal')
  demoCount.value = currentPlayerHP.value || 0
  resetDefs()
}

const resetDefs = () => {
  defList.value.splice(0);
  defCount.value = 0
}

const saveHP = () => {
  gameHandler.updateCurrentHP(demoCount.value)
  if (defList.value.length > 0) {
    gameHandler.updateDEF(defList.value)
  }
  close()
}
</script>
