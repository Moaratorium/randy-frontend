<script setup>
import SongTag from '../components/songtag.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const serverId = route.params.key;
const serverName = ref(null);

const api = import.meta.env.VITE_BACKEND_API;

const queue = ref(null)
let data = '';

watch(() => route.params.id, getQueue, { immediate: true })


async function getQueue() {
  try {
    if (!serverId) {
      throw new Error(`Not in a valid server`)
    }
    const response = await fetch(`${api}/server?guildId=${serverId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    data = await response.json();
    queue.value = data[0].queue;
    serverName.value = data[0].name; 
    } catch (error) {
    console.error(error.message)
  } 
}
</script>

<template>
<h1>Playing for : {{ serverName }} </h1>
<div v-if="queue && queue.length !== 0" class="content">
  <SongTag
  v-for="(song, index) in queue"
  :key="index"
  :title="song.info.title"
  :artist="song.info.author"
  class="flex-child"
  ></SongTag>
</div>
<div v-else class="content">Nothing is playing.</div>
<button @click="getQueue" class="refresh-button">refresh</button>
</template>

<style scoped>

</style>
