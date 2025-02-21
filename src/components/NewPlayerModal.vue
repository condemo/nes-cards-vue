<template>
  <dialog id="new_player_modal" class="modal modal-top">
    <div class="modal-box">
      <div class="flex flex-col">
        <input v-model="playerName" type="text" placeholder="Type here"
          class="input input-bordered input-primary w-3/4 mx-auto max-w-xs my-4" />
        <button class="btn btn-primary w-1/3 mx-auto">Create</button>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn fixed top-1 right-1">X</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const playerName = ref<string>('')
</script>
