<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  msg: String,
})
  


</script>

<template>
<h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="discordRedirect">login</button>
      <RouterLink to="/servers">Test servers</RouterLink>
  </div>
</template>

<style scoped>

</style>
