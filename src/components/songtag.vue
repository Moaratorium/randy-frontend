<script setup>
defineProps(['title', 'artist'])
</script>

<template>
  <div class="songTag">
    <div id="songTitle" class="flex-child">{{ title }}</div>
    <div id="songArtist" class="flex-child">{{ artist }}</div>
  </div>
</template>

<style scoped>
.songTag {
  display: flex;
}

.flex-child {
  flex: 1;
  border: 1px solid white;
  width: 100%;
}
</style>
