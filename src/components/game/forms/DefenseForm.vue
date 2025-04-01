<template>
  <div id="defense-form" class="flex flex-col w-full">
    <div class="flex flex-row space-x-5 mx-auto text-2xl">
      <button class="btn btn-error" @click="defList.splice(0)">del</button>
      <button class="btn btn-circle btn-secondary" @click="def--">-</button>
      <label @click="def = 0">{{ def }}</label>
      <button class="btn btn-circle btn-secondary" @click="def++">+</button>
      <button class="btn btn-square btn-primary" @click="add">Add</button>
    </div>
    <div>Current Move: {{ defList }}</div>
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

const def = ref<number>(0)
const defList = ref<number[]>([])

const reset = () => {
  defList.value.splice(0)
  def.value = 0
}

watch(() => currentPlayerTurn.value, () => {
  reset()
})

watch(() => turnMode.value, () => {
  reset()
})

const add = () => {
  if (def.value > 0) {
    defList.value.push(def.value)
    def.value = 0
  }
}

const save = () => {
  gameHandlerStore.updateDEF(defList.value)
  emits('close-update-modal')
  reset()
}
</script>
