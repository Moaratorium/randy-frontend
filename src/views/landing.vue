<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();

const username = ref(null);

const isLoggedIn = ref(false);

const emit = defineEmits(['checkLogin'])

onMounted(() => {
  handleLogin();
});

function handleLogin() {
  let storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    isLoggedIn.value = true;
    username.value = storedUsername;
    router.push('/servers')
  } else {
    let token = getTokenFromHash();
    if (token) {
      fetchUserDetails(token);
    }
  }
}

function getTokenFromHash() {
  const hash = window.location.hash;
  if (hash.includes("access_token")) {
    return new URLSearchParams(hash.slice(1)).get("access_token");
  }
  return null;
}

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
      isLoggedIn.value = true;
      localStorage.setItem("username", data.username);
      emit('checkLogin')
      router.push('/servers')
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

function loginWithDiscord() {
  const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
  const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;
  const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    DISCORD_REDIRECT_URI
  )}&response_type=token&scope=identify`;
  window.location.href = oauthUrl;
}

</script>

<template>
  <div class="card">
    <div id="welcome">Randy Music Bot</div>
      <button v-if="!isLoggedIn" type="button" @click="loginWithDiscord">
        Discord Login
      </button>
  </div>
</template>

<style scoped>
</style>
