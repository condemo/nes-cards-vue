<template>
  <dialog id="game-update-modal" class="modal modal-bottom modal-open">
    <div class="modal-box">
      <button @click="$emit('close-update-modal')"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <GameUpdateForm :title="currentSection"></GameUpdateForm>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import GameUpdateForm from './forms/GameUpdateForm.vue';

defineProps({
  currentSection: { type: String, required: true }
})

</script>
