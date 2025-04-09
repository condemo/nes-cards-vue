<template>
  <div id="altered-form" class="flex flex-col space-y-2">
    <div class="flex flex-row space-x-5 mx-auto text-2xl">
      <label>Strength: </label>
      <button class="btn btn-circle btn-secondary" @click="move.strength--">-</button>
      <label>{{ move.strength }}</label>
      <button class="btn btn-circle btn-secondary" @click="move.strength++">+</button>
    </div>
    <div class="flex flex-row space-x-5 mx-auto text-2xl">
      <label>Intangible: </label>
      <button class="btn btn-circle btn-secondary" @click="move.intangible--">-</button>
      <label>{{ move.intangible }}</label>
      <button class="btn btn-circle btn-secondary" @click="move.intangible++">+</button>
    </div>
    <div class="flex flex-row space-x-5 mx-auto text-2xl">
      <label>Confusion: </label>
      <button class="btn btn-circle btn-secondary" @click="move.confusion--">-</button>
      <label>{{ move.confusion }}</label>
      <button class="btn btn-circle btn-secondary" @click="move.confusion++">+</button>
    </div>
    <div class="flex flex-row space-x-5 mx-auto text-2xl">
      <label>Distract: </label>
      <button class="btn btn-circle btn-secondary" @click="move.distract--">-</button>
      <label>{{ move.distract }}</label>
      <button class="btn btn-circle btn-secondary" @click="move.distract++">+</button>
    </div>
    <div class="flex flex-row space-x-5 mx-auto text-2xl">
      <label>Poison: </label>
      <button class="btn btn-circle btn-secondary" @click="move.poison--">-</button>
      <label>{{ move.poison }}</label>
      <button class="btn btn-circle btn-secondary" @click="move.poison++">+</button>
    </div>
    <button class="btn btn-primary my-3" @click="save">Save</button>
  </div>
</template>

<script setup lang="ts">
import { useGameHandlerStore } from '@/stores/gameHandler';
import { PlayerTurn } from '@/types/game';
import { storeToRefs } from 'pinia';
import { reactive, watch } from 'vue';

const gameHandlerStore = useGameHandlerStore()
const { currentPlayerTurn, player1Move, player2Move, turnMode } = storeToRefs(gameHandlerStore)
const emits = defineEmits(['close-update-modal'])

const move = reactive({
  poison: 0,
  distract: 0,
  intangible: 0,
  confusion: 0,
  strength: 0
})

let playerMove = (
  currentPlayerTurn.value === PlayerTurn.Player1
    ? player1Move
    : player2Move
)

watch(() => currentPlayerTurn.value, () => {
  playerMove = (
    currentPlayerTurn.value === PlayerTurn.Player1
      ? player1Move
      : player2Move
  )
  resetMove()
})

watch(() => turnMode.value, () => {
  resetMove()
})


const resetMove = () => {
  // NOTE: awfull reset
  move.confusion = 0
  move.poison = 0
  move.intangible = 0
  move.strength = 0
  move.distract = 0
}

const save = () => {
  // NOTE: awfull
  playerMove.value.strength += move.strength
  playerMove.value.intangible += move.intangible
  playerMove.value.confusion += move.confusion
  playerMove.value.poison += move.poison
  playerMove.value.distract += move.distract

  resetMove()
  emits('close-update-modal')
}
</script>
