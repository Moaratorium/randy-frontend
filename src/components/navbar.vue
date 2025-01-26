<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter();
const emit = defineEmits(['checkLogin'])
const username = ref(localStorage.getItem("username"));

function redirectToLogin() {
    router.push('/')
}

function logout() {
  localStorage.removeItem("username");
        emit('checkLogin')
        router.push("/");
    }

</script>
<template>
<div id="nav-items">
    <RouterLink to="/" class="nav-link">landing dasdasd</RouterLink>
    <RouterLink to="/commands" class="nav-link">Commands</RouterLink>
    <RouterLink to="/servers" class="nav-link">Servers</RouterLink>
    <div id="username">{{ username }}</div>
    <button v-if="username" type="button" @click="logout">Logout</button>
    <button v-else type="button" @click="redirectToLogin">Login</button>
</div>
</template>
<style scoped>
#nav-items {
    width: 100%;
}

.nav-link {
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

</style>
