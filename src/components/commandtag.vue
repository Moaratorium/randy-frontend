<script setup>
defineProps(['commandName', 'description'])
</script>

<template>
  <div class="commandTag">
    <div id="commandName" class="flex-child"><div class="highlight">{{ commandName }}</div></div>
    <div id="commandDescription" class="flex-child">{{ description }}</div>
  </div>
</template>

<style scoped>
.commandTag {
  display: flex;
  width: 100%;
}

.flex-child {
  flex: 1;
  border: 1px solid white;
  text-align: left;
  padding-left: 2px;
}

.highlight {
  color: #f2e753;
}


</style>
