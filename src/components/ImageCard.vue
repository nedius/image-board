<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    msg: String,
    rawData: Object,
    image: String,
    height: Number,
    width: Number
})

onMounted(() => {
    console.log('ImageCard mounted with rawData:', props.rawData);
});

</script>

<template>
    <n-card hoverable>
        <template #cover>
            <n-image lazy :src="props.rawData.raw.large_file_url" :preview-src="props.rawData.raw.file_url" :height="props.rawData.height" :width="props.rawData.width" />
        </template>
    </n-card>
</template>  

<style scoped>
 .n-card{
    width: unset;
 }
</style>