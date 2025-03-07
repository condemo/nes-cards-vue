import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

interface Theme {
  name: string
  value: string
}

const themeList: Theme[] = [
  { name: 'Garden', value: 'garden' },
  { name: 'Dark', value: 'dark' },
  { name: 'Cupcake', value: 'cupcake' },
  { name: 'Synthwave', value: 'synthwave' },
  { name: 'Retro', value: 'retro' },
  { name: 'Cyberpunk', value: 'cyberpunk' },
  { name: 'Winter', value: 'winter' },
  { name: 'Forest', value: 'forest' },
]

export const useConfigStore = defineStore("config", () => {
  const currentTheme = ref<string | null>(localStorage.getItem('theme'))
  const html = document.querySelector('html')

  if (!currentTheme.value) {
    currentTheme.value = 'garden'
  }

  watchEffect(async () => {
    html?.setAttribute("data-theme", currentTheme.value as string)
    localStorage.setItem('theme', currentTheme.value as string)
    console.log('config saved')
  })

  return {
    themeList,
    currentTheme,
  }
})
