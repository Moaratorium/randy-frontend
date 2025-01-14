<script setup>
import { RouterLink, useRouter, useRoute } from 'vue-router';

const router = useRouter();

function logout() {
  localStorage.removeItem("username");
        router.push("/");
    }


</script>
<template>
<div id="nav-wrapper">
    <div id="brand">Randy Music Bot</div>
    <RouterLink to="/">Home</RouterLink>
    <div class="padding"></div>
    <RouterLink to="commands">Commands</RouterLink>
    <div class="padding"></div>
    <RouterLink to="servers">Servers</RouterLink>
    <div class="padding"></div>
    <button type="button" @click="logout">Logout</button>
</div>
</template>
<style scoped>
#nav-wrapper {
    width: 100%;
    align-items: center;
    justify-content: center;
}
</style>