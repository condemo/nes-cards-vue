<template>
  <div class="flex flex-col space-y-2 hover:cursor-pointer">

    <div class="stats shadow w-40 bg-neutral" :class="[
      { 'border-4': playerMenu },
      turnMode === TurnMode.Attack
        ? 'border-primary'
        : 'border-secondary'
    ]">
      <div class="stat" @click="openHPModal">
        <div class="stat-title text-accent text-xl font-bold">
          <div class="flex flex-row justify-center">
            <p>{{ player?.name }} &nbsp;</p>
            <div v-if="currentPlayerTurn === playerPosition" class="font-bold">
              <svg v-if="turnMode === TurnMode.Attack" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                class="w-6">
                <g class="" style="" transform="translate(0,0)">
                  <path
                    d="M19.75 14.438c59.538 112.29 142.51 202.35 232.28 292.718l3.626 3.75.063-.062c21.827 21.93 44.04 43.923 66.405 66.25-18.856 14.813-38.974 28.2-59.938 40.312l28.532 28.53 68.717-68.717c42.337 27.636 76.286 63.646 104.094 105.81l28.064-28.06c-42.47-27.493-79.74-60.206-106.03-103.876l68.936-68.938-28.53-28.53c-11.115 21.853-24.413 42.015-39.47 60.593-43.852-43.8-86.462-85.842-130.125-125.47-.224-.203-.432-.422-.656-.625C183.624 122.75 108.515 63.91 19.75 14.437zm471.875 0c-83.038 46.28-154.122 100.78-221.97 161.156l22.814 21.562 56.81-56.812 13.22 13.187-56.438 56.44 24.594 23.186c61.802-66.92 117.6-136.92 160.97-218.72zm-329.53 125.906l200.56 200.53c-4.36 4.443-8.84 8.793-13.405 13.032L148.875 153.53l13.22-13.186zm-76.69 113.28l-28.5 28.532 68.907 68.906c-26.29 43.673-63.53 76.414-106 103.907l28.063 28.06c27.807-42.164 61.758-78.174 104.094-105.81l68.718 68.717 28.53-28.53c-20.962-12.113-41.08-25.5-59.937-40.313 17.865-17.83 35.61-35.433 53.157-52.97l-24.843-25.655-55.47 55.467c-4.565-4.238-9.014-8.62-13.374-13.062l55.844-55.844-24.53-25.374c-18.28 17.856-36.602 36.06-55.158 54.594-15.068-18.587-28.38-38.758-39.5-60.625z"
                    fill="currentColor" fill-opacity="1"></path>
                </g>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6">
                <g class="" style="" transform="translate(0,0)">
                  <path
                    d="M253.875 20.844c-61.545.405-123.647 9.54-187.47 27.812L59.938 50.5l-.28 6.72c-6.405 147.46 49.12 346.625 192.28 429.28l4.688 2.688 4.656-2.688c139.03-80.27 201.88-281.764 195.376-429.28l-.125-5.907-6.624-2.657c-63.63-18.215-126.57-27.65-190.062-27.812-1.984-.005-3.984-.013-5.97 0zm.344 18.625c1.86-.013 3.73-.006 5.593 0 59.47.15 118.43 8.782 178.28 25.343 3.956 139.034-57.428 327.223-181.468 402.625-128.09-77.646-182.55-263.02-178.438-402.594C138.233 48.228 196.493 39.838 254.22 39.47zM258 56.03l-28.438 126.72-45.312-25.313 26.97 48.25-92.5 26.157 91.655 25.937-26.688 47.72 45.625-25.5 28.657 127.688 28.655-127.625 45.875 25.656-26.72-47.814 91.845-26-92.75-26.25 27.063-48.406-45.5 25.438L258 56.03z"
                    fill="currentColor" fill-opacity="1"></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-items-center text-primary mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8">
            <path
              d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
          <p class="font-bold text-3xl">{{ playerStats?.hp }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-row space-x-1 justify-center w-2/3 mx-auto font-bold">
      <div class="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd"
            d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
            clip-rule="evenodd" />
        </svg>
        <span>{{ playerStats?.strength }}</span>
      </div>
      <div class="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path
            d="M10.5 1.875a1.125 1.125 0 0 1 2.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 0 1 2.25 0v10.937a4.505 4.505 0 0 0-3.25 2.373 8.963 8.963 0 0 1 4-.935A.75.75 0 0 0 18 15v-2.266a3.368 3.368 0 0 1 .988-2.37 1.125 1.125 0 0 1 1.591 1.59 1.118 1.118 0 0 0-.329.79v3.006h-.005a6 6 0 0 1-1.752 4.007l-1.736 1.736a6 6 0 0 1-4.242 1.757H10.5a7.5 7.5 0 0 1-7.5-7.5V6.375a1.125 1.125 0 0 1 2.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 0 1 2.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875Z" />
        </svg>
        <span>{{ playerStats?.intangible }}</span>
      </div>
      <div class="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd"
            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
            clip-rule="evenodd" />
        </svg>
        <span> {{ playerStats?.confusion }}</span>
      </div>
    </div>
    <UpdateMenu v-show="playerMenu" @open-update-modal="openUpdateModal" />
    <HPForm :open="hpModal" @close-hp-modal="closeHPModal" />
    <div class="divider"></div>
    <TowerStat :thp="playerStats?.t1hp"
      :defs="playerStats?.t2hp === 0 && playerStats.t1hp > 0 ? playerStats.defenses : undefined"
      :player-position="playerPosition" @open-update-modal="openUpdateModal" />
    <TowerStat :thp="playerStats?.t2hp" :defs="checkTowerHP() ? playerStats?.defenses : undefined"
      :player-position="playerPosition" @open-update-modal="openUpdateModal" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import type { Player, PlayerStats, PlayerTurn } from '@/types/game'
import TowerStat from './TowerStat.vue'
import UpdateMenu from './game/UpdateMenu.vue';
import HPForm from './game/forms/HPForm.vue';
import { TurnMode, UpdateMode } from '@/types/game'
import { useGameHandlerStore } from '@/stores/gameHandler';
import { storeToRefs } from 'pinia';

const props = defineProps({
  player: {
    type: Object as PropType<Player>,
  },
  playerStats: {
    type: Object as PropType<PlayerStats>,
  },
  playerPosition: { type: Number as PropType<PlayerTurn>, required: true }
})

const gameHandlerStore = useGameHandlerStore()
const { currentPlayerTurn, turnMode } = storeToRefs(gameHandlerStore)

const emit = defineEmits(['open-update-modal', 'open-hp-modal'])

const hpModal = ref<boolean>(false)

const playerMenu = computed(() => {
  return currentPlayerTurn.value === props.playerPosition
})

const checkTowerHP = (): boolean => {
  if (props.playerStats) {
    if (props.playerStats.t2hp > 0) {
      return true
    }
  }
  return false
}

const openUpdateModal = (mode: UpdateMode) => {
  emit('open-update-modal', mode)
}

const openHPModal = () => {
  if (currentPlayerTurn.value === props.playerPosition) {
    hpModal.value = true
  }
}

const closeHPModal = () => {
  hpModal.value = false
}
</script>
