<template>
  <div id="damage-form" class="flex flex-col w-full">
    <div class="flex flex-row space-x-5 mx-auto text-2xl">
      <button class="btn btn-error" @click="dmgList.splice(0)">del</button>
      <button class="btn btn-circle btn-secondary" @click="dmg--">-</button>
      <label @click="dmg = 0">{{ dmg }}</label>
      <button class="btn btn-circle btn-secondary" @click="dmg++">+</button>
      <button class="btn btn-square btn-primary" @click="add">Add</button>
    </div>
    <div>Current DMG: {{ dmgList }}</div>
    <button class="btn btn-primary my-3" @click="save">Save</button>
  </div>
</template>

<script setup lang="ts">
import { useGameHandlerStore } from '@/stores/gameHandler';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const emits = defineEmits(['close-update-modal'])

const gameHandlerStore = useGameHandlerStore()
const { currentPlayerTurn, turnMode } = storeToRefs(gameHandlerStore)
const dmg = ref<number>(0)
const dmgList = ref<number[]>([])

const reset = () => {
  dmgList.value.splice(0)
  dmg.value = 0
}

watch(() => currentPlayerTurn.value, () => {
  reset()
})

watch(() => turnMode.value, () => {
  reset()
})

const add = () => {
  if (dmg.value > 0) {
    dmgList.value.push(dmg.value)
    dmg.value = 0
  }
}

const save = () => {
  gameHandlerStore.updateDMG(dmgList.value)
  emits('close-update-modal')
}

</script>
