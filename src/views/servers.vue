<script setup>
import { ref, watch } from 'vue'
import ServerTag from '../components/servertag.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const api = import.meta.env.VITE_BACKEND_API;

const serverList = ref(null)

watch(() => route.params.id, getServers, { immediate: true })

async function getServers() {
  try {
    const response = await fetch(`${api}/servers`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    serverList.value = await response.json();
  } catch (error) {
    console.error(error.message)
  } 
}

</script>

<template>
<h1>Server List</h1>
<div v-if="serverList" class="content">
  <ServerTag
  v-for="(server, index) in serverList"
  :key="index"
  :id="server.id"
  :name="server.name"
  :image="server.icon"
  ></ServerTag>
</div>
<div v-else class="empty">
  No servers present.
</div>
</template>

<style scoped>

</style>
