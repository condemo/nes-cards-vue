<template>
  <div>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ formatedDate }}</h2>
        <div class="flex flex-row justify-around">
          <SimplePlayerStat :player="game.player1" :stats="game.p1stats" :winner="game.player1.name === game.winner" />
          <SimplePlayerStat :player="game.player2" :stats="game.p2stats" :winner="game.player2.name === game.winner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Game } from '@/types/game';
import type { PropType } from 'vue';
import SimplePlayerStat from './partials/SimplePlayerStat.vue'

const props = defineProps({
  game: {
    type: Object as PropType<Game>,
    required: true,
  }
});

const date = new Date((props.game?.createdAt as string))
const m = date.getMonth() + 1
const formatedDate = date.getDate() + "/" + m + "/" + date.getFullYear()

</script>
