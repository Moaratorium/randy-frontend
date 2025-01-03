<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/authstore'

const route = useRoute()

const authStore = useAuthStore();

let username = ref(null);
let msg = ref("login with discord");
let loggedIn = ref(false);

function loginWithDiscord() {
  const clientId = "1306115574849601568";
  const redirectUri = "http://localhost:5173/callback";
  const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=token&scope=identify`;
  window.location.href = oauthUrl;
};

async function fetchUserDetails(token) {
  try {
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    username.value = data.username;
    authStore.setUser(data.username)
    console.log(authStore.getUser) // quick verification
    if (username.value) {
    msg.value = ("logged in as: ")
    loggedIn.value = true;}
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

function getToken() {
  const hash = window.location.hash;
  if (hash.includes("access_token")) {
    const token = new URLSearchParams(hash.slice(1)).get("access_token");
    return token;
  }
}

function handleLogin() {
  const code = getToken();
  fetchUserDetails(code)
}

onMounted(() => {
  handleLogin();
})

</script>

<template>
  <div class="card">
    <div>
      <h1>{{ msg }}</h1>
      <button v-if="!loggedIn" type="button" @click="loginWithDiscord">login</button>
      <div id="displayUsername"> {{ username }} </div>
    <RouterLink to="/servers">Test servers</RouterLink>
  </div>
  </div>
</template>

<style scoped></style>
