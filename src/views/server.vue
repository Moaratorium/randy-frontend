<script setup>
import SongTag from "../components/songtag.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const serverId = route.params.key;
const serverName = ref(null);
const addSong = ref(null);
const serverIcon = ref(null);
const prefix = ref(">");
const api = import.meta.env.VITE_BACKEND_API;
const queue = ref(null);
let data = "";

watch(() => route.params.id, getQueue, { immediate: true });

async function getQueue() {
  try {
    if (!serverId) {
      throw new Error(`Not in a valid server`);
    }
    const response = await fetch(`${api}/server?guildId=${serverId}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    data = await response.json();
    queue.value = data.queue;
    serverName.value = data.name;
    serverIcon.value = data.icon;
  } catch (error) {
    console.error(error.message);
  }
}

async function sendSkip() {
  try {
    if (!serverId) {
      throw new Error(`Not in a valid server`);
    }
    const response = await fetch(`${api}/skipSong`, {
      method: "POST",
      body: JSON.stringify({ guildId: `${serverId}` }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
  getQueue();
}

async function clearQueue() {
  try {
    if (!serverId) {
      throw new Error(`Not in a valid server`);
    }
    const response = await fetch(`${api}/clearQueue`, {
      method: "POST",
      body: JSON.stringify({ guildId: `${serverId}` }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
  getQueue();
}

async function removeLastSong() {
  try {
    if (!serverId) {
      throw new Error(`Not in a valid server`);
    }
    const response = await fetch(`${api}/removeLast`, {
      method: "POST",
      body: JSON.stringify({ guildId: `${serverId}` }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
  getQueue();
}

async function addSongToQueue() {
  try {
    if (!serverId) {
      throw new Error(`Not in a valid server`);
    }
    const response = await fetch(`${api}/addSong`, {
      method: "POST",
      body: JSON.stringify({
        guildId: `${serverId}`,
        track: `${addSong.value}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    addSong.value = "song name, url, etc...";
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
  getQueue();
}
</script>

<template>
  <div id="server-info">
    <img id="server-icon" :src="serverIcon" />
    <div id="name-prefix">
      <div id="server-name" class="server-item">{{ serverName }}</div>
      <div id="prefix" class="server-item">
        Prefix: <span class="highlight">{{ prefix }}</span>
      </div>
    </div>
  </div>
  <div id="column-wrapper">
    <div id="position-col" class="column">Position</div>
    <div id="title-col" class="column">Title</div>
    <div id="artist-col" class="column">Artist</div>
  </div>
  <div v-if="queue && queue.length !== 0" class="content">
    <SongTag
      v-for="(song, index) in queue"
      :key="index"
      :position="index"
      :title="song.info.title"
      :artist="song.info.author"
    ></SongTag>
  </div>
  <div v-else class="content">Nothing is playing.</div>
  <div id="button-wrapper">
    <button @click="sendSkip" class="server-button" id="skip-button">
      Skip
    </button>
    <button @click="clearQueue" class="server-button" id="clear-button">
      Clear Queue
    </button>
    <button @click="removeLastSong" class="server-button" id="remove-button">
      Remove Last
    </button>
    <button @click="getQueue" class="server-button" id="refresh-button">
      Refresh
    </button>
  </div>
  <div>
    <fieldset>
      <legend id="i-am-legend">Add Song to Queue:</legend>
      <div>
        <input
          type="text"
          id="add-song"
          v-model="addSong"
          placeholder="Add a song to queue..."
        />
        <button @click="addSongToQueue" class="server-button" id="add-button">
          ->
        </button>
      </div>
    </fieldset>
  </div>
</template>

<style scoped>
#column-wrapper {
  display: flex;
  width: 100%;
}

#server-info {
  display: flex;
  width: 100%;
  align-items: center;
  text-align: center;
}

#server-icon {
  border: 1px solid rgba(255, 255, 255, 0.603);
  border-radius: 8px;
  box-shadow: 0 0 2px 2px rgba(97, 97, 97, 0.171);
}

#server-name {
  font-size: 2.4em;
  font-weight: bold;
}

#name-prefix {
  width: 100%;
}

#prefix {
  font-size: 1.2em;
}

.highlight {
  color: #efff64;
}

.server-item {
  width: 100%;
  margin: auto;
}

#column-wrapper {
  margin-top: 1em;
}

.column {
  flex: 1;
}

#position-col {
  max-width: 10%;
}

#add-song {
  field-sizing: content;
  min-width: 30em;
  max-width: 58em;
  margin-right: 1em;
}

fieldset {
  border: 0;
}

#i-am-legend {
  display: none;
}

#button-wrapper {
  padding-top: 1em;
  padding-bottom: 0.5em;
}
</style>
