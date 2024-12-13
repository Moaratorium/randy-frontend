<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    error: String
})

let defaultError = "404 - Page Not Found";
let errMsg = ref("");
onMounted(() => {
    if(!props.error) {
        errMsg.value = defaultError;
    } else {
        errMsg.value = props.error;
    }
})
</script>

<template>
<div>
    <p id="errorField">{{ errMsg }}</p>
</div>
</template>

<style scoped>
</style>