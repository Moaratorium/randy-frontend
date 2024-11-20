<script setup>
import { RouterLink } from 'vue-router'
defineProps(['name', 'image'])
</script>

<template>
  <div class="serverTag">
    <img :src="image">

     <RouterLink :to="`${name}`">{{ name }}</RouterLink>
  </div>
</template>

<style scoped>

</style>
