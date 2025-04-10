<template>
  <div class="flex flex-col">
    <template v-if="playerMove">
      <p v-show="playerMove.damage.length > 0">Damage: <span v-for="(d, i) in playerMove.damage" :key="i">{{ d
          }}&nbsp;</span>
      </p>
      <p v-show="playerMove.distract > 0">Distract: {{ playerMove.distract }}</p>
      <p v-show="playerMove.poison > 0">Poison: {{ playerMove.poison }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PlayerMove } from '@/game/game';
import { type PropType } from 'vue';

defineProps({
  playerMove: { type: Object as PropType<PlayerMove> }
})

</script>
