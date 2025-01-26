<script setup>
import Navbar from './components/navbar.vue';
import { useRoute } from 'vue-router'

const navKey = 0;
const route = useRoute();

function loginRefresh() {
  console.log('navbar refresh')
  navKey++;
}

</script>

<template>
  <div id="navbar-wrapper">
    <Navbar :key="navKey" id="navbar" @checkLogin="loginRefresh"></Navbar>
  </div>
  <div id="viewPane">
    <RouterView :key="route.fullPath" @checkLogin="loginRefresh"></RouterView>
  </div>
</template>

<style scoped>
#viewPane {
  align-items: center;
  word-wrap: break-word;
}

#navbar-wrapper {
  display: flex;
  margin-bottom: 2%;
  }

#navbar {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
