<script setup>
import {useRoute} from 'vue-router'

defineProps(["serverName", "serverID"])
</script>

<template>
<h1>test:  {{ $route.serverID }}</h1> <!-- might need to make a GET request here instead of passing variables, we'll see -->
</template>

<style scoped>

</style>
