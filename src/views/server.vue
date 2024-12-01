<script setup>
import {mockServer} from '../../mocks.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'


const serverId = mockServer.id;
const route = useRoute()

const api = import.meta.env.VITE_BACKEND_API;
const loading = ref(false)
let queue = ref(null)
const error = ref(null)

watch(() => route.params.id, getQueue, { immediate: true })

async function getQueue() {
  error.value = queue = null
  loading.value = true
  try {
    const response = await fetch(`${api}/queue?guildId=${serverId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
      // custom error handling WIP
    }
    queue = await response.json();
    console.log(queue)
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}

</script>

<template>
<h1>test:  The queue for server :{{ serverId }} </h1> <!-- might need to make a GET request here instead of passing variables, we'll see -->
<div v-if="loading" class="loading">Loading...</div>
<div v-if="error" class="error">error test</div>
<div v-if="queue" class="content">{{ queue }}</div>
<button @click="getQueue"></button>
</template>

<style scoped>

</style>
