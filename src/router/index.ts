import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecordView from '@/views/RecordView.vue'
import GameView from '@/views/GameView.vue'
import NewGameView from '@/views/NewGameView.vue'
import ConfigView from '@/views/ConfigView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/records',
      name: 'records',
      component: RecordView,
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
    },
    {
      path: '/new-game',
      name: 'new game',
      component: NewGameView,
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
