<script setup>
import { ref, watch } from 'vue'
import ServerTag from '../components/servertag.vue'
import { useRoute } from 'vue-router'
  
const mockLiveData = ref([
    {
        "name": "Light Heaven/Lowrollers",
        "id": "881111533332684298",
        "icon": 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Basic_human_drawing.png/170px-Basic_human_drawing.png' // live returns null?
    },
    {
        "name": "Moaratorium's Testland",
        "id": "1207461053911122233",
        "icon": 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Basic_human_drawing.png/170px-Basic_human_drawing.png'
    }
]);

const route = useRoute()

const api = import.meta.env.VITE_BACKEND_API;
const loading = ref(false)
let serverList = ref(null)
const error = ref(null)

watch(() => route.params.id, getServers, { immediate: true })

async function getServers() {
  error.value = serverList = null
  loading.value = true
  try {
    const response = await fetch(`${api}/servers`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
      // custom error handling WIP
    }
    serverList = await response.json();
    console.log(serverList)
  } catch (error) {
    console.error(error.message)
  } finally {
    loading.value = false
  }
}

</script>

<template>
<h1>Server List</h1>
<div v-if="loading" class="loading">Loading...</div>
<div v-if="error" class="error">error test</div>
<div v-if="serverList" class="content">
  <ServerTag
  v-for="(server, index) in serverList"
  :key="index"
  :id="server.id"
  :name="server.name"
  :image="server.icon"
  ></ServerTag>
</div>
</template>

<style scoped>

</style>
