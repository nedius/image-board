<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    msg: String,
    rawData: Object,
    image: String,
    height: Number,
    width: Number,
})

const isImage = ref(false);
const isVideo = ref(false);
// const isFlash = ref(false);

onMounted(() => {
    console.log('ImageCard mounted with rawData:', props.rawData);
    const ext = props.rawData.src.split('.').pop().toLowerCase();
    switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
            isImage.value = true;
            break;
        case 'mp4':
        case 'webm':
            isVideo.value = true;
            break;
        // case 'swf':
        //     isFlash.value = true;
        //     break;
        // case 'zip':
        //     // ugoira
        //     break;
        default:
            console.warn('Unsupported file type:', props.rawData.raw.file_ext);
    }
    // console.log(`File type: ${props.rawData.raw.file_ext}, isImage: ${isImage.value}, isVideo: ${isVideo.value}`);
});

</script>

<template>
    <n-card hoverable>
        <template #cover>
            <n-image v-if="isImage" lazy 
                :src="props.rawData.raw.large_file_url" 
                :preview-src="props.rawData.raw.file_url" 
                :height="props.rawData.height" 
                :width="props.rawData.width" />
            <video n-video v-else-if="isVideo" controls autoplay muted loop
                :src="props.rawData.raw.large_file_url"
                :poster="props.rawData.raw.file_url"
                :height="props.rawData.height"
                :width="props.rawData.width">
            </video>
            <p v-else>Unsupported file type: {{ props.rawData.raw.file_ext }}</p>
        </template>
    </n-card>
</template>  

<style scoped>
 .n-card{
    width: unset;
 }
</style>