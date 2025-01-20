<script setup>
import { RouterLink } from 'vue-router'
defineProps(['name', 'image', 'id'])
</script>

<template>
  <div class="serverTag">
    <img :src="image">
     <RouterLink 
     :to="{path: `/servers/${id}`}"
     >{{ name }}</RouterLink> 
  </div>
</template>

<style scoped>
.serverTag {
  display: block;
  margin-top: 1em;
}
</style>
