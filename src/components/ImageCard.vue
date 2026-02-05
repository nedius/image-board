<script setup>
defineProps({
    msg: String,
    image: String,
    height: Number,
    width: Number
})
</script>

<template>
    <n-card hoverable>
        <!-- {{ msg }} -->
        <template #cover>
            <n-image :src="image" :height="height" :width="width" />    
        </template>
    </n-card>
</template>  

<style scoped>
 .n-card{
    width: unset;
 }
</style>