<template>
  <dialog id="game-update-modal" class="modal modal-bottom" :class="{ 'modal-open': open }">
    <div class="modal-box">
      <button @click="close" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <GameUpdateForm :title="currentSection">
        <!-- TODO: Renderizar diferentes forms dependiendo de la sección que corresponda -->
        <slot />
      </GameUpdateForm>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="close">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import GameUpdateForm from './forms/GameUpdateForm.vue';
import { UpdateMode } from '@/types/game'

defineProps({
  currentSection: { type: String as PropType<UpdateMode>, required: true },
  open: { type: Boolean, required: true }
})

const emit = defineEmits(['close-update-modal'])
const close = () => {
  emit('close-update-modal')
}

</script>
