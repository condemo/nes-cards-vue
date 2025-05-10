import './assets/css/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useConfigStore } from '@/stores/config'
import { useGameDataStore } from './stores/gameData'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Setup config hooks
useConfigStore()
useGameDataStore()

app.mount('#app')
