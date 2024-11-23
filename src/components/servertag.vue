<script setup>
import { RouterLink } from 'vue-router'
defineProps(['name', 'image'])
</script>

<template>
  <div class="serverTag">
    <img :src="image">

     <RouterLink :to="{path: `/servers/${name}`, props: { name: `${name}`}}">{{ name }}</RouterLink> <!-- not passing properly -->
  </div>
</template>

<style scoped>

</style>
