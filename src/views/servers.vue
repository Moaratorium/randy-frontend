<script setup>
import { ref } from 'vue'
import ServerTag from '../components/servertag.vue'
  
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
</script>

<template>
<h1>Server List</h1>
  <ServerTag
  v-for="(server, index) in mockLiveData"
  :key="server.id"
  :name="server.name"
  :image="server.icon"
  ></ServerTag>
</template>

<style scoped>

</style>
