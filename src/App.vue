<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'

</script>

<template>
  <header>
   <Navbar/>
   <router-view></router-view>
  </header>


</template>

<style>



</style>
