<script setup>
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

let isLoggedIn = localStorage.getItem("username");

function logout() {
  localStorage.removeItem("username");
        router.push("/");
    }

</script>
<template>
<div id="nav-items">
    <div id="brand">Randy Music Bot</div>
    <RouterLink to="/" class="nav-link">Home</RouterLink>
    <RouterLink to="/commands" class="nav-link">Commands</RouterLink>
    <RouterLink to="/servers" class="nav-link">Servers</RouterLink>
    <button v-if="isLoggedIn" type="button" @click="logout">Logout</button>
</div>
</template>
<style scoped>
#nav-items {
    width: 100%;
}

.nav-link, #brand {
    margin: 0 1em;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    transition: border-color 0.25s;
    min-width: 10%;
    color: whitesmoke;
    padding-block: 7.5px;
}:hover {
    border-color: #efff64;
}

button {
    margin: auto;
    margin-right: 0;
    border-radius: 8px;
}

#brand {
    margin-left: 0;
    border-radius: 8px;
}

</style>
