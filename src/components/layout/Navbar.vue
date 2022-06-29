<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{name:'GMap'}" class="brand-logo left">GeoLocation</router-link>
        <ul class="right">
            <li v-if="!user"> <router-link :to="{name:'Signup'}">Signup</router-link></li>
            <li v-if="!user"> <router-link :to="{name:'Login'}">Login</router-link></li>
            <li v-if="user"><a>{{user.email}}</a></li>
            <li v-if="user"><a @click="logout" >Logout</a></li>
           
          
        </ul>
        </div>
    </nav>
  </div>
</template>

<script>
import { signOut,} from '@firebase/auth'
import {auth} from '@/firebase/init'
import getUser from '@/composables/getUser'
export default {
name:'Navbar',
data(){
    const {user} =getUser()
    return{
      user
    }

},

methods:{
  logout(){
signOut(auth).then(()=>{
  this.$router.push({name:'Login'})
})
  }
}
}
</script>

<style>

</style>