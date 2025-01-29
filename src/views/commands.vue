<script setup>
import { ref, onMounted } from 'vue'
import CommandTag from '../components/commandtag.vue';

const commandsList = ref(null);
const api = import.meta.env.VITE_BACKEND_API;
let data = '';

onMounted(()=> {
    getCommands();
})

async function getCommands() {
  try {
    const response = await fetch(`${api}/commands`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    data = await response.json();
    commandsList.value = data; 
    } catch (error) {
    console.error(error.message)
  } 
}

</script>

<template>
<div id="command-disclaimer">All commands can be used with either "/" or the server's specific prefix.</div>
<div id="column-wrapper">
      <div id="name-col" class="column">Command</div>
      <div id="description-col" class="column">Description</div>
    </div>
<div v-if="commandsList && commandsList.length !== 0" class="content">
  <CommandTag
  v-for="(command, index) in commandsList"
  :key="index"
  :commandName="command.command"
  :description="command.description"
  ></CommandTag>
</div>
<div v-else class="content">Error: No Commands Listed.</div>
</template>

<style scoped>
</style>