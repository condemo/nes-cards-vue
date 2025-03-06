import { defineStore } from "pinia";
import { ref } from "vue";

interface Theme {
  name: string
  value: string
}

export const useConfigStore = defineStore("config", () => {
  const themeList: Theme[] = [
    { name: 'Garden', value: 'garden' },
    { name: 'Dark', value: 'dark' },
    { name: 'Cupcake', value: 'cupcake' },
    { name: 'Synthwave', value: 'synthwave' },
    { name: 'Retro', value: 'retro' },
    { name: 'Cyberpunk', value: 'cyberpunk' },
  ]

  const currentTheme = ref<string>(themeList[0].value)
  const html = document.querySelector('html')

  const loadTheme = () => {
    const current = localStorage.getItem('theme')

    if (current) {
      currentTheme.value = current
    }

    html?.setAttribute('data-theme', currentTheme.value)
  }

  const setTheme = (theme: string) => {
    currentTheme.value = theme
    html?.setAttribute('data-theme', currentTheme.value)
    localStorage.setItem('theme', theme)
  }

  return {
    themeList,
    currentTheme,
    loadTheme,
    setTheme
  }
})
