<script setup>
import { mockServer } from '../../mocks.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'


const serverId = mockServer.id;
const serverName = mockServer.name;
const route = useRoute()

const api = import.meta.env.VITE_BACKEND_API;

const queue = ref(null)

watch(() => route.params.id, getQueue, { immediate: true })

async function getQueue() {
  try {
    const response = await fetch(`${api}/queue?guildId=${serverId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
      // custom error handling WIP
    }
    queue.value = await response.json();
    console.log(queue)
  } catch (error) {
    console.error(error.message)
  } 
}

</script>

<template>
<h1>test:  The queue for server : {{ serverName + serverId }} </h1>
<div v-if="queue" class="content">{{ queue }}</div>
<div v-else class="content">Nothing is playing...</div>
<button @click="getQueue"></button>
</template>

<style scoped>

</style>
