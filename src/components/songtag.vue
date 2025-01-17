<script setup>
defineProps(['title', 'artist', 'position'])
</script>

<template>
  <div class="songTag">
    <div id="songPosition" class="flex-child">{{ position }}</div>
    <div id="songTitle" class="flex-child">{{ title }}</div>
    <div id="songArtist" class="flex-child">{{ artist }}</div>
  </div>
</template>

<style scoped>
.songTag {
  display: flex;
  width: 100%;
}

.flex-child {
  flex: 1;
  border: 1px solid white;
  text-align: left;
  padding-left: 2px;
}

#songPosition {
  max-width: 10%;
  text-align: center;
}
</style>
