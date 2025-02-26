<template>
  <dialog id="new_player_modal" class="modal modal-open modal-top">
    <div class="modal-box">
      <div class="flex flex-col">
        <p class="text-error">{{ errorMsg }}</p>
        <input
          v-model="playerName"
          type="text"
          placeholder="Type here"
          class="input input-bordered input-primary w-3/4 mx-auto max-w-xs my-4"
        />
        <button @click="$emit('user-create', playerName)" class="btn btn-primary w-1/3 mx-auto">
          Create
        </button>
      </div>
      <div class="modal-action">
        <button @click="$emit('close-modal')" class="btn fixed top-1 right-1">X</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const playerName = ref<string>('')
defineProps({
  errorMsg: { type: String, required: true },
})
</script>
