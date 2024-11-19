<script setup>
defineProps(['name', 'image'])
</script>

<template>
  <div class="serverTag">
    <img :src="image">
    {{ name }}
  </div>
</template>

<style scoped>

</style>
