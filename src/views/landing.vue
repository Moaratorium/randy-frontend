<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (localStorage.getItem('username')){
    router.push('/servers');
  } else if (route.name === "landing") {
    loginWithDiscord();
  }
})

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
      <button type="button" @click="loginWithDiscord">
        Discord Login
      </button>
  </div>
</template>

<style scoped>
</style>
