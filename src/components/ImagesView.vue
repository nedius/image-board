<script setup>
import { useThrottleFn } from '@vueuse/core';

const props = defineProps({
    msg: String
})

const emit = defineEmits(['update:size']);

const queryParams = useQueryStore();

// const currentIndex = ref(0);
const currentPage = ref(1);

const imageArr = ref([]);
const getImages = async (page) => {
    const apiUrl = `${import.meta.env.VITE_IMAGE_BOARD_API_URL}/query?${queryParams.getString}&page=${page}`;
    // const apiUrl = `${import.meta.env.VITE_IMAGE_BOARD_API_URL}/query?tags=cat&rating=sfw&score=50&limit=6&page=${page}`;
    const data = await fetch(apiUrl).then(res => res.json());
    let newImages = [];
    data.result.forEach((item, index) => {
        newImages.push({
            id: imageArr.value.length + index,
            src: item.url,
            width: item.raw.image_width,
            height: item.raw.image_height,
            raw: item.raw
        });
    });
    return newImages;
}
const addToImageArr = (newImages) => {
    imageArr.value = [...imageArr.value, ...newImages];
    console.log(`Added ${newImages.length} images, total images: ${imageArr.value.length}`);
    console.log(newImages);
}

const handleUpdateCurrent = (current) => {
    console.log(`current image index: ${current}/${imageArr.value.length}`);
    if (current >= imageArr.value.length - 3) {
        // load more images
        console.log('load more images...');
        currentPage.value += 1;
        getImages(currentPage.value).then(newImages => {
            addToImageArr(newImages);
        });
    }
}

const clearImageArr = () => {
    imageArr.value = [];
    currentPage.value = 1;
}

const handleInfiniteScrollLoad = useThrottleFn(() => {
        console.log('infinite scroll load triggered');
        if (!queryParams.hasRandom){
            currentPage.value += 1;
        }
        getImages(currentPage.value).then(newImages => {
            addToImageArr(newImages);
        });
}, 500);

onMounted(() => {
    // initial load
    getImages(currentPage.value).then(newImages => {
        addToImageArr(newImages);
    });

    window.addEventListener('scroll', handleInfiniteScrollLoad);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleInfiniteScrollLoad);
});

watch(imageArr, (newArr) => {
    console.log(`imageArr updated, total images: ${newArr.length}`);
    emit('update:size', newArr.length);
});

queryParams.$onAction((action) => {
    console.log(`Action triggered:`, action);
    // console.log(action.after);
    if (!(action.name == 'doSearch' || action.name == 'doClear')) return;

    action.after(() => {
        if (!(action.name == 'doSearch' || action.name == 'doClear')) return;
        // console.log('Search parameters updated, refreshing images...');
        switch (action.name) {
            case 'doSearch':
                    getImages(currentPage.value).then(newImages => {
                        clearImageArr();
                        addToImageArr(newImages);
                    });
                break;
            case 'doClear':
                    clearImageArr();
                break;
            default:
                return;
        }
    });
});

</script>

<template>
    <n-h1>{{ msg }}</n-h1>
    <div class="grid-container" id="gridContainer">
        <n-image-group @update:current="handleUpdateCurrent">
            <!-- <n-infinite-scroll :ref="nInfiniteScroll" @load="handleInfiniteScrollLoad" :distance="1000"> -->
                <!-- <n-virtual-list
                    :item-size="imageArr.length"
                    :items="imageArr"
                    item-resizable
                > -->
                    <ImageCard class="grid-item" v-for="item in imageArr" :key="item.id" :rawData="item" :content="(item.id+1) + ': ' + item.raw.id + ', ' + item.width + 'x' + item.height"/>
                <!-- </n-virtual-list> -->
            <!-- </n-infinite-scroll> -->
        </n-image-group>
    </div>
    <n-button style="display: block; margin: 1em auto;" @click="handleInfiniteScrollLoad">Load More Images</n-button>
</template>

<style>
    .grid-container {
        display: flex;
        flex-wrap: wrap;
    }

    .grid-container .grid-item {
        /* border: 1px solid light-dark(black, #dadada); */
        /* margin: 10px; */
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        position: relative;
    }
    
    .grid-container#gridContainer {
        justify-content: space-evenly;
        gap: 10px;
    }

    .grid-item .n-image,
    .grid-item video[n-video] {
        position: relative;
        height: 400px;
        width: auto;
        max-width: 100%;
    }

    @media (max-width: 600px) {
            .grid-item .n-image,
            .grid-item video[n-video] {
                height: auto;
            }
    }
    .n-image:empty {
        height: 0px;
    }

    .n-image>video,
    .n-image>img {
        height: inherit;
        width: inherit;
        max-width: inherit;
        object-fit: contain;
    }

    .n-image>img {
        cursor: pointer;
    }

    .grid-container {
        flex-direction: initial;
    }

    .grid-container>div:not(.grid-container#gridContainer>div) {
        margin-right: 1em;
    }

    .grid-container h2 {
        margin-top: 0;
    }

    .grid-container h3 {
        margin: 0;
    }

    .banned {
        border: 1px solid red !important;
        background-color: #ffcccc2b;
    }

    .deleted {
        border: 2px dashed red !important;
    }

    .loliwarning {
        border: 2px solid yellow !important;
    }

    .deleted b,
    .banned b {
        color: red;
    }
</style>
