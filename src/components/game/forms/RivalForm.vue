<template>
  <div id="stats-form" class="flex flex-col space-y-2 w-full">
    <div class="flex flex-row space-x-5 mx-auto text-2xl">
      <label for="st">ST:</label>
      <button class="btn btn-circle btn-secondary" @click="updateStrength(1)">+</button>
      <label id="st" @click="move.strength = 0">{{ move.strength }}</label>
      <button class="btn btn-circle btn-secondary" @click="updateStrength(-1)">-</button>
    </div>
    <div class="flex flex-row space-x-5 mx-auto text-2xl">
      <label>CON:</label>
      <button class="btn btn-circle btn-secondary" @click="updateConfusion(-1)">-</button>
      <label @click="move.confusion = 0">{{ move.confusion }}</label>
      <button class="btn btn-circle btn-secondary" @click="updateConfusion(1)">+</button>
    </div>
    <div class="flex flex-row justify-around p-2 mt-2">
      <button class="btn btn-error w-1/6" @click="reset">reset</button>
      <button class="btn btn-primary w-4/6" @click="save">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameHandlerStore } from '@/stores/gameHandler';
import { storeToRefs } from 'pinia';
import { reactive, watch } from 'vue';

const emits = defineEmits(['close-update-modal'])

const gameHandlerStore = useGameHandlerStore()
const { currentPlayerTurn, turnMode } = storeToRefs(gameHandlerStore)

const move = reactive({
  confusion: 0,
  strength: 0
})

const updateConfusion = (count: number) => {
  move.confusion += count
  if (move.confusion < 0) { move.confusion = 0 }
}

const updateStrength = (count: number) => {
  move.strength += count
  if (move.strength > 0) { move.strength = 0 }
}

const reset = () => {
  move.strength = 0
  move.confusion = 0
}


watch(() => currentPlayerTurn.value, () => {
  reset()
})

watch(() => turnMode.value, () => {
  reset()
})

const save = () => {
  gameHandlerStore.updateRivalStats(move)
  emits('close-update-modal')
  reset()
}
</script>
