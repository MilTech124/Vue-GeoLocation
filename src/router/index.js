import { createRouter, createWebHistory } from 'vue-router'
import GMap from '@/components/home/GMap.vue'
import Signup from '@/components/auth/Signup.vue'
import Login from '@/components/auth/Login.vue'
import { auth } from '../firebase/init'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/signup',
      name:'Signup',
      component:Signup
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    }
  
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(rec=>rec.meta.requireAuth)){
    let user =auth.currentUser
    if(user){
      next()
    }else{
      next({name:'Login'})
    }
  }else{
    next()
  }
})

export default router
