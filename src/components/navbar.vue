<script setup>
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();
const emit = defineEmits(["checkLogin"]);
const username = ref(localStorage.getItem("username"));
const isLoggedIn = ref(false);

function redirectToLogin() {
  router.push("/");
}

onMounted(() => {
  handleLogin();
});

function handleLogin() {
  let storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    username.value = storedUsername;
    router.push("/servers");
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
      router.push("/servers");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

function logout() {
  localStorage.removeItem("username");
  emit("checkLogin");
  router.push("/logout");
}

</script>
<template>
  <div id="nav-items">
    <RouterLink to="/commands" class="nav-link">Commands</RouterLink>
    <RouterLink to="/servers" class="nav-link">Servers</RouterLink>
    <div id="username">
      <a id="username-text">{{ username }}</a>
    </div>
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
}
:hover {
  border-color: #efff64;
}

button {
  margin: auto;
  margin-right: 0;
  border-radius: 8px;
}

#username {
  text-align: left;
  margin: 0 em;
  font-size: 1.4em;
  font-weight: 600;
  margin-left: 14em;
  padding-top: 0.2em;
  color: whitesmoke;
}

#username-text {
  color: whitesmoke;
}
#username-text:hover {
  color: #efff64;
}
</style>
