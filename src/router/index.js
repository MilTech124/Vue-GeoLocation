import { createRouter, createWebHistory } from 'vue-router'
import GMap from '@/components/home/GMap.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap
    },
  
  ]
})

export default router
