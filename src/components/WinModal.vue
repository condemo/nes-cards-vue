<template>
  <div>
    <dialog id="win-modal" class="modal modal-center modal-open">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Game Ended</h3>
        <p class="py-4 text-3xl font-bold text-primary">{{ winner }} <span class="text-3xl font-bold text-success">
            Wins! </span></p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn" @click="goHome">Go Home</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps({
  winner: { type: String }
})

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>
