<template>
  <div class="flex flex-col">
    <div>
      <button class="btn btn-square w-12 h-12 border-4 border-primary bg-transparent fixed top-2 right-2"
        @click="$router.back()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
          class="w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="flex flex-col mb-5 mt-1 flex-grow">
      <div id="logo" class="flex flex-col justify-center items-center text-4xl">
        <img @load="logoLoaded()" v-show="isLogoLoaded" class="mb-2 mt-4" src="https://picsum.photos/100/100" />
        <LoadingSpinner v-show="!isLogoLoaded" />
        <h1>Slay Rivals</h1>
      </div>
      <div id="info" class="flex flex-col rounded-2xl h-80 mt-7 mx-2 p-4 shadow-2xl">
        <div class="flex flex-col flex-grow shadow-lg rounded-xl">
          <div class="flex-grow">
            <div class="p-3 text-center w-28 mx-auto">
              <p>{{ description }}</p>
            </div>
          </div>
          <div class="my-2 text-neutral">
            <p>ver.: {{ currentVersion }} build.: {{ currentBuild }}</p>
          </div>
        </div>
        <div id="web-links" class="flex flex-row justify-evenly mt-3 space-x-1 *:w-14 *:h-14">
          <a href="https://github.com/condemo/nes-cards-vue" target="_blank">
            <button class="btn bg-black text-black border-[#e5e5e5] w-14 h-14">
              <svg aria-label="GitHub logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="white"
                  d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z">
                </path>
              </svg>
            </button>
          </a>
          <a href="mailto:gustleo.dev@gmail.com">
            <button class="btn bg-white text-black border-[#e5e5e5] w-14 h-14">
              <svg aria-label="Email icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="black">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
            </button>
          </a>
          <a href="https://bsky.app/profile/gusatope.bsky.social" target="_blank">
            <svg aria-label="BlueSky account" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_154_148)">
                <rect width="1024" height="1024" transform="translate(1024 1024) rotate(-180)" fill="#F7F8FA" />
                <rect width="1024" height="1024" fill="url(#paint0_linear_154_148)" />
                <path
                  d="M351.121 315.106C416.241 363.994 486.281 463.123 512 516.315C537.719 463.123 607.759 363.994 672.879 315.106C719.866 279.83 796 252.536 796 339.388C796 356.734 786.055 485.101 780.222 505.943C759.947 578.396 686.067 596.876 620.347 585.691C735.222 605.242 764.444 670.002 701.333 734.762C581.473 857.754 529.061 703.903 515.631 664.481C513.169 657.254 512.017 653.873 512 656.748C511.983 653.873 510.831 657.254 508.369 664.481C494.939 703.903 442.527 857.754 322.667 734.762C259.556 670.002 288.778 605.242 403.653 585.691C337.933 596.876 264.053 578.396 243.778 505.943C237.945 485.101 228 356.734 228 339.388C228 252.536 304.134 279.83 351.121 315.106Z"
                  fill="white" />
              </g>
              <defs>
                <linearGradient id="paint0_linear_154_148" x1="512" y1="0" x2="515.066" y2="1024"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#0A7AFF" />
                  <stop offset="1" stop-color="#59B9FF" />
                </linearGradient>
                <clipPath id="clip0_154_148">
                  <rect width="1024" height="1024" fill="white" transform="translate(1024 1024) rotate(-180)" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div>&#127279; 2025 Gustavo de los Santos.
      <a class="link" href="https://github.com/condemo/nes-cards-vue/blob/main/LICENSE">License Info</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const currentVersion = __APP_VERSION__
const currentBuild = __CURRENT_BUILD__
const description = __DESCRIPTION__
const isLogoLoaded = ref<boolean>(false)

const logoLoaded = () => {
  isLogoLoaded.value = true
}
</script>
