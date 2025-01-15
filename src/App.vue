<script setup>
import Navbar from './components/navbar.vue';
import {useRoute} from 'vue-router'

const route = useRoute();
</script>

<template>
  <div id="navbar-wrapper">
    <Navbar id="navbar"></Navbar>
  </div>
  <div id="viewPane">
    <RouterView :key="route.fullPath"></RouterView>
  </div>
</template>

<style scoped>
#viewPane {
  border: 1px solid white;
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
