import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecordView from '@/views/RecordView.vue'
import GameView from '@/views/GameView.vue'
import NewGameView from '@/views/NewGameView.vue'
import ConfigView from '@/views/ConfigView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/records',
      name: 'records',
      component: RecordView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
      props: (route) => ({ fromNavigation: route.query.nav === 'true' }),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/new-game',
      name: 'new game',
      component: NewGameView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/config',
      name: 'config',
      component: ConfigView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
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


router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  const { isLogged } = storeToRefs(authStore)
  if (to.matched.some(value => value.meta.requireAuth)) {
    if (!isLogged.value) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
