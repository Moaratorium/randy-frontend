<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();

const username = ref(null);
const message = ref("Login with Discord");
const isLoggedIn = ref(false);

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;

function loginWithDiscord() {
  const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    DISCORD_REDIRECT_URI
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
      message.value = `Logged in as: ${username.value}`;
      isLoggedIn.value = true;
      localStorage.setItem("username", data.username);
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

function getTokenFromHash() {
  const hash = window.location.hash;
  if (hash.includes("access_token")) {
    return new URLSearchParams(hash.slice(1)).get("access_token");
  }
  return null;
};

function handleLogin() {
  const storedUsername = localStorage.getItem("username");

  if (storedUsername) {
    isLoggedIn.value = true;
    username.value = storedUsername;
    message.value = `Logged in as: ${storedUsername}`;
  } else {
    const token = getTokenFromHash();
    if (token) {
      fetchUserDetails(token);
    }
  }
};

function logout() {
  localStorage.removeItem("username");
  username.value = null;
  isLoggedIn.value = false;
  router.push("/");
};

onMounted(() => {
  handleLogin();
});
</script>

<template>
  <div class="card">
    <div>
      <h1>{{ message }}</h1>
      <button v-if="!isLoggedIn" type="button" @click="loginWithDiscord">
        Login
      </button>
      <div id="displayUsername">{{ username }}</div>
      <RouterLink to="/servers">Server List</RouterLink>
      <button v-if="isLoggedIn" type="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped></style>
