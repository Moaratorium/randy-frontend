<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  msg: String,
})
  

</script>

<template>
<h1>{{ msg }}</h1>
  <div class="card">
    <button type="button">
      <RouterLink to="/servers">Test servers</RouterLink></button>
  </div>
</template>

<style scoped>

</style>
