<template>
  <div id="move-resume" class="flex flex-col mt-4">
    <div class="flex flex-row justify-around">
      <PlayerMoveResume :player-move="player1Move" id="player1-resume" />
      <PlayerMoveResume :player-move="player2Move" id="player2-resume" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameHandlerStore } from '@/stores/gameHandler';
import { storeToRefs } from 'pinia';
import PlayerMoveResume from './PlayerMoveResume.vue';

const gameHandlerStore = useGameHandlerStore()
const { player1Move, player2Move } = storeToRefs(gameHandlerStore)

</script>
