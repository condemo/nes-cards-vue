<template>
  <div class="card shadow-xl w-32" :class="statsClass.card">
    <div class="card-body">
      <h2 class="card-title" :class="statsClass.title">{{ player.name }}</h2>
      <div class="flex flex-col">
        <div class="flex flex-row items-center text-error">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path
              d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z">
            </path>
          </svg>
          <p class="align-middle" :class="statsClass.pHP">{{ stats.hp }}</p>
        </div>
        <div class="flex flex-row items-center" :class="statsClass.t1hp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd"
              d="M3.75 2a.75.75 0 0 0 0 1.5H4v9h-.25a.75.75 0 0 0 0 1.5H6a.5.5 0 0 0 .5-.5v-3A.5.5 0 0 1 7 10h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h2.25a.75.75 0 0 0 0-1.5H12v-9h.25a.75.75 0 0 0 0-1.5h-8.5ZM6.5 4a.5.5 0 0 0-.5.5V5a.5.5 0 0 0 .5.5H7a.5.5 0 0 0 .5-.5v-.5A.5.5 0 0 0 7 4h-.5ZM6 7a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 .5.5v.5A.5.5 0 0 1 7 8h-.5a.5.5 0 0 1-.5-.5V7Zm3-3a.5.5 0 0 0-.5.5V5a.5.5 0 0 0 .5.5h.5A.5.5 0 0 0 10 5v-.5a.5.5 0 0 0-.5-.5H9Zm-.5 3a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H9a.5.5 0 0 1-.5-.5V7Z"
              clip-rule="evenodd"></path>
          </svg>
          <p class="align-middle" :class="statsClass.t1hp">
            {{ stats.t1hp }}
          </p>
        </div>
        <div class="flex flex-row items-center" :class="statsClass.t2hp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd"
              d="M3.75 2a.75.75 0 0 0 0 1.5H4v9h-.25a.75.75 0 0 0 0 1.5H6a.5.5 0 0 0 .5-.5v-3A.5.5 0 0 1 7 10h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h2.25a.75.75 0 0 0 0-1.5H12v-9h.25a.75.75 0 0 0 0-1.5h-8.5ZM6.5 4a.5.5 0 0 0-.5.5V5a.5.5 0 0 0 .5.5H7a.5.5 0 0 0 .5-.5v-.5A.5.5 0 0 0 7 4h-.5ZM6 7a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 .5.5v.5A.5.5 0 0 1 7 8h-.5a.5.5 0 0 1-.5-.5V7Zm3-3a.5.5 0 0 0-.5.5V5a.5.5 0 0 0 .5.5h.5A.5.5 0 0 0 10 5v-.5a.5.5 0 0 0-.5-.5H9Zm-.5 3a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H9a.5.5 0 0 1-.5-.5V7Z"
              clip-rule="evenodd"></path>
          </svg>
          <p class="align-middle" :class="statsClass.t2hp">
            {{ stats.t2hp }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player, PlayerStats } from '@/types/game'
import { type PropType } from 'vue'
const props = defineProps({
  player: {
    type: Object as PropType<Player>,
    required: true,
  },
  stats: {
    type: Object as PropType<PlayerStats>,
    required: true,
  },
  winner: {
    type: Boolean,
    required: true,
  },
})

const statsClass = {
  card: props.winner ? 'border-2 border-primary' : 'bg-base-100',
  title: props.winner ? 'text-xl font-bold' : '',
  pHP: props.stats.hp <= 0 ? 'text-base-300' : 'accent-base-content',
  t1hp: props.stats.t1hp <= 0 ? 'text-base-300' : 'base-content',
  t2hp: props.stats.t2hp <= 0 ? 'text-base-300' : 'base-content',
}
</script>
