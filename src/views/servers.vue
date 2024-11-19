<script setup>
import { ref } from 'vue'
import ServerTag from '../components/servertag.vue'
  
const dummyServerList = ref([
    {
        serverName: "Server1",
        serverID: 1234567890,
        serverImageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Basic_human_drawing.png/170px-Basic_human_drawing.png'
    },
    {
        serverName: "Server2",
        serverID: 1231231231,
        serverImageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Basic_human_drawing.png/170px-Basic_human_drawing.png'
    },
    {
        serverName: "Server3",
        serverID: 3213213213,
        serverImageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Basic_human_drawing.png/170px-Basic_human_drawing.png'
    },
    {
        serverName: "Server4",
        serverID: 1111111111,
        serverImageUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Basic_human_drawing.png/170px-Basic_human_drawing.png'
    }
]);
</script>

<template>
<h1>Server List</h1>
  <ServerTag
  v-for="(server, index) in dummyServerList"
  :key="server.serverID"
  :title="server.serverName"
  :image="server.serverImageUri"
  ></ServerTag>
</template>

<style scoped>

</style>
