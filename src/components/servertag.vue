<script setup>
import { RouterLink } from 'vue-router'
defineProps(['name', 'image', 'id'])
</script>

<template>
  <div class="serverTag">
    <img :src="image">
    <h2>{{ id }}</h2>
     <RouterLink 
     :to="{path: `/servers/${id}`}"
     >{{ name }}</RouterLink> 
  </div>
</template>

<style scoped>

</style>
