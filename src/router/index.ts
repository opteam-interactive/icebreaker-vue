import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '@/views/Registration.vue'
import Game from '@/views/Game.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },
  ],
})

export default router
