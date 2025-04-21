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
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="close">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  open: { type: Boolean }
})

const emits = defineEmits(['close-hp-modal'])
const demoCount = ref<number>(60)

const close = () => {
  emits('close-hp-modal')
}
</script>
