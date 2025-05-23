import './assets/css/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/interceptors/axios'

import App from './App.vue'
import router from './router'
import { useConfigStore } from '@/stores/config'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Setup config hooks
useAuthStore()
useConfigStore()

app.mount('#app')
