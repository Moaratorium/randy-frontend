<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue';

const router = useRouter()

let user = ref(null);
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
    if (username.value) {
    msg.value = ("logged in as: ")
    loggedIn.value = true;
    localStorage.setItem("login", data.username)
  }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

function getToken() {
  let token = null;
  const hash = window.location.hash;
  if (hash.includes("access_token")) {
    token = new URLSearchParams(hash.slice(1)).get("access_token");
  }
  return token;
}

function handleLogin() {
  if (localStorage.getItem("login")) {
    loggedIn.value = true;
    username.value = localStorage.getItem("login")
  } else {
    const token = getToken();
    if (token) {
      fetchUserDetails(token)
    }
  }
}

function logout(){
  localStorage.removeItem("login")
  username.value = null;
  loggedIn.value = false;
  router.push('/')
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
    <button v-if="loggedIn" type="button" @click="logout">logout</button>
  </div>
  </div>
</template>

<style scoped></style>
