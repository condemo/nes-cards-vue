<template>
  <dialog id="hp-modal" class="modal modal-center" :class="{ 'modal-open': open }">
    <div class="modal-box">
      <h1 class="mb-4 text-3xl">Modify HP</h1>
      <div class="flex flex-row justify-center items-center space-x-3">
        <button class="btn btn-circle btn-secondary" @click="demoCount -= 10">-10</button>
        <button class="btn btn-circle btn-secondary" @click="demoCount -= 1">-1</button>
        <div class="text-2xl">{{ demoCount }}</div>
        <button class="btn btn-circle btn-secondary" @click="demoCount += 1">+1</button>
        <button class="btn btn-circle btn-secondary" @click="demoCount += 10">+10</button>
      </div>
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
  open: { type: Boolean }
})

const gameHandler = useGameHandlerStore()
const { currentPlayerHP } = storeToRefs(gameHandler)

const emits = defineEmits(['close-hp-modal'])
const demoCount = ref<number>(currentPlayerHP.value || 0)

watch(currentPlayerHP, () => {
  demoCount.value = currentPlayerHP.value || 0
})

const close = () => {
  emits('close-hp-modal')
  demoCount.value = currentPlayerHP.value || 0
}

const saveHP = () => {
  gameHandler.updateCurrentHP(demoCount.value)
  close()
}
</script>
