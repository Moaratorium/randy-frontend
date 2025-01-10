<script setup>
import { mockServer } from '../../mocks.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'


//remember the json comes in as array, meaning we maaay need to account for it by targeting an index or modifying response
const serverName = ref(mockServer.name); //^^^
const route = useRoute()

const api = import.meta.env.VITE_BACKEND_API;

const queue = ref(mockServer.queue)
const data = ref(null)

watch(() => route.params.id, getQueue, { immediate: true })

async function getQueue() {
  try {
    const response = await fetch(`${api}/server?guildId=${serverId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    data.value = await response.json();
    // parse json into queue and server info here, serverName
    
    //end
    console.log(data)
  } catch (error) {
    console.error(error.message)
  } 
}

</script>

<template>
<h1>Playing for : {{ serverName }} </h1>
<div v-if="queue" class="content">{{ queue }}</div>
<div v-else class="content">Nothing is playing.</div>
<button @click="getQueue"></button>
</template>

<style scoped>

</style>
