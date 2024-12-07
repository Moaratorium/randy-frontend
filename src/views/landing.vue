<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { onMounted } from 'vue';

defineProps({
  msg: String,
})

const route = useRoute()

const user = null;
const username = null;

function loginWithDiscord() {
  const oauthUrl = `https://discord.com/oauth2/authorize?client_id=1306115574849601568&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fcallback&scope=identify`;
  window.location.href = oauthUrl;
};

async function getTokenDiscord() {
  console.log('running getTokenDiscord')
    const code = processURL();
    const params = new URLSearchParams()
    params.append('client_id', import.meta.env.VITE_DISCORD_ID)
    params.append('client_secret', import.meta.env.VITE_DISCORD_TOKEN)
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', import.meta.env.VITE_DISCORD_REDIRECT)
    params.append('scope', 'identify')

    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'post',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      }
    })

    return await response.json()
}

function processURL() {
  console.log('running processURL from own block')
  const params = new URLSearchParams(window.location.search);
  console.log(params.get('code'))
  return params.get('code')
};

// 
// async function fetchUserData() {
//   console.log('fetching user data')
//   try {
//     const response = await fetch('https://discord.com/api/users/@me', {
//       headers: {
//         Authorization: `Bearer ${route.query.access_token}`, //${this.$route.query.access_token}
//       },
//     });
//     user = {
//       username: response.data.username,
//       avatarUrl: `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png`,
//     };
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// };
// 
// function logout() {
//   user = null;
//   // Optionally, clear tokens if stored
// }

onMounted(() => {
  getTokenDiscord();
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')]
  if (!accessToken) {
    console.log(' discord function reads no access token, running fetch')
    fetch('https://discord.com/api/users/@me', {
			headers: {
				authorization: `${tokenType} ${accessToken}`,
			},
		})
    .then(result => result.json())
			.then(response => {
				const { username, discriminator } = response;
        console.log(`${discriminator}, ${username}`)
			})
			.catch(console.error);
  }
})

// function checkForToken() {
//   console.log('checking for token')
//       const hash = window.location.hash;
//       if (hash.includes("access_token")) {
//         console.log('found hash token')
//         const token = new URLSearchParams(hash.slice(1)).get("access_token");
//         this.fetchUserData(token);
//       }
//     }



</script>

<template>
<h1>{{ msg }}</h1>
  <div class="card">
    <div v-if="!username">
    <button type="button" @click="loginWithDiscord">login</button>
  </div>
  <div v-else> {{ username }} </div>
      <RouterLink to="/servers">Test servers</RouterLink>
  </div>
</template>

<style scoped>

</style>
