<template>
  <div class="navbar">
    <nav class="container">
        <router-link :to="{name:'GMap'}">GeoLocation</router-link>
        <ul class="right">
            <li> <router-link :to="{name:'Signup'}">Signup</router-link></li>
            <li> <router-link :to="{name:'Login'}">Login</router-link></li>
            <li><a @click="logout" >Logout</a></li>
          
        </ul>
    </nav>
  </div>
</template>

<script>
import { signOut,} from '@firebase/auth'
import {auth} from '@/firebase/init'
export default {
name:'Navbar',
data(){
    
    return{

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