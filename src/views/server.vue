<script setup>
import {mockServer} from '../../mocks.js'
import { ref } from 'vue'

defineProps(["serverName", "serverID"])
const server = ref(mockServer);


</script>

<template>
<h1>test:  The queue for server :{{ mockServer.id }} </h1> <!-- might need to make a GET request here instead of passing variables, we'll see -->
<p></p>
</template>

<style scoped>

</style>
