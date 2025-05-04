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
    <div class="flex flex-col mb-5 mt-1">
      <div id="logo" class="flex flex-col justify-center items-center text-4xl">
        <img class="mb-2 mt-4" src="https://picsum.photos/100/100" />
        <h1>Slay Rivals</h1>
      </div>
      <div id="info" class="rounded-2xl h-80 mt-7 mx-2 p-4 border border-primary shadow-2xl">
      </div>
    </div>
    <div class="fixed bottom-16 left-3 p-1">Copyright &copy; 2025 Gustavo de los Santos.
      <a class="link" href="https://github.com/condemo/nes-cards-vue/blob/main/LICENSE">License Info</a>
    </div>
  </div>
</template>
