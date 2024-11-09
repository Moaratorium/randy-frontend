<script setup>
import { createRouter } from 'vue-router'
import { ref } from 'vue'

defineProps({
  msg: String,
})

  function discordLogin() {
      this.$router.push('/')
    }
  

</script>

<template>
<h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="discordLogin">Log In With Discord</button>
  </div>
</template>

<style scoped>

</style>
