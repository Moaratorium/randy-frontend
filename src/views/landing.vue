<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  msg: String,
})
  
const scopes = 'identify email guilds'

function processURL() {
  console.log('running processURL from own block')
  const params = new URLSearchParams(window.location.search);
  return params.get('code')
};

function discordRedirect() {
  console.log('running redirect')
  window.location.href = import.meta.env.VITE_DISCORD_REDIRECT_URI
};

if (window.location.search.includes('code=')) {
  console.log('triggering processURL via includes block')
  const code = processURL();
  // break
  exchangeCodeForToken(code).then(accessToken => { // check when this is hit
  console.log('running func exchangeCodeForToken')
  console.log('test Access Token : ' + accessToken)
  return getUserData(accessToken)
}).then(userData => {
  console.log('test User Data: ' + userData)
}).catch(err => {
  console.error('Oauth Error', err)
})
}

async function exchangeCodeForToken(code) {
  const tokenURL = 'https://discord.com/api/oauth2/token';
  const params = new URLSearchParams();
  params.append('client_id', import.meta.env.VITE_DISCORD_ID); // dragons somewhere in here
  params.append('client_secret', import.meta.env.VITE_DISCORD_TOKEN); 
  params.append('code', code); 
  params.append('grant_type', 'authorization_code');
  params.append('redirect_uri', import.meta.env.VITE_DISCORD_REDIRECT);
  params.append('scope', scopes);

  const response = await fetch(tokenURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await response.json();
  if (response.ok) {
    return data.access_token;
  } else {
    throw new Error(data.error || 'Failed to get access token');
  }
};

async function getUserData(accessToken) {
  const response = await fetch('https://discord.com/api/v10/users/@me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  if (response.ok) {
    return data; // Return user data
  } else {
    throw new Error(data.error || 'Failed to fetch user data');
  }
};

</script>

<template>
<h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="discordRedirect">login</button>
      <RouterLink to="/servers">Test servers</RouterLink>
  </div>
</template>

<style scoped>

</style>
