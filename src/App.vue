<script setup>
import Navbar from './components/navbar.vue';
import {useRoute} from 'vue-router'

const route = useRoute();
</script>

<template>
  <div id="navbar">
    <Navbar></Navbar>
  </div>
  <div id="viewPane">
    <RouterView :key="route.fullPath"></RouterView>
  </div>
</template>

<style scoped>
#viewPane {
  border: 1px solid white;
}

#navbar {
  display: flex;
  justify-content: center;
}
</style>
