<template>
  <div class="flex flex-col">
    <template v-if="playerMove">
      <p v-show="playerMove.damage.length > 0">Damage: <span v-for="(d, i) in playerMove.damage" :key="i">{{ d
          }}&nbsp;</span>
      </p>
      <p v-show="playerMove.defense.size() > 0">Defense: <span v-for="(d, i) in defList" :key="i">{{ d.def
          }}&nbsp;</span></p>
      <p v-show="playerMove.strength !== 0">Strength: {{ playerMove.strength }}</p>
      <p v-show="playerMove.intangible > 0">Intangible: {{ playerMove.intangible }}</p>
      <p v-show="playerMove.confusion > 0">Confusion: {{ playerMove.confusion }}</p>
      <p v-show="playerMove.distract > 0">Distract: {{ playerMove.distract }}</p>
      <p v-show="playerMove.poison > 0">Poison: {{ playerMove.poison }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PlayerMove } from '@/game/game';
import { computed, type PropType } from 'vue';

const props = defineProps({
  playerMove: { type: Object as PropType<PlayerMove> }
})

const defList = computed(() => {
  if (props.playerMove) {
    return [...props.playerMove.defense.defenseList].reverse()
  }
})

</script>
