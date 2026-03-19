<script setup>
import { ref } from 'vue';

const menuCollapsed = Math.max(window.screen.width, window.innerWidth) < 700;
const isFooterFixed = computed(() =>{
    let menuContent = document.getElementById('menu-content') || 0;
    return menuContent.clientHeight < window.innerHeight - 64;
});

const settings = useSettingsStore();
const isCollapsed = computed(() => {
    return !settings.isSidebarOpen;
});

const queryParams = useQueryStore();

const shownImagesCount = ref(0);

onMounted(() => {
    settings.setSidebarOpen(!menuCollapsed);
});
</script>

<template>
    <n-layout has-sider position="absolute" style="top: 64px;" sider-placement="right">
        <n-layout id="menu-scrollbar" :nativeScrollbar="false">
            <n-layout ref="menuContent" id="menu-content" content-style="padding: 24px;">
                <div v-show="!(shownImagesCount > 0)">
                    <n-h1>very beautiful image</n-h1>
                    <n-flex justify="center">
                        <n-button @click="queryParams.doSearch({tags: 'cat', rating: 'sfw', hasScore: true, score: 50, hasRandom: false, hasLimit: true, limit: 10, hasAge: false})" icon-placement="right">
                            <template #icon>
                                <n-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20">
                                        <g fill="none">
                                            <path
                                                fill="currentColor"
                                                d="M4.97 18h9.28c.947 0 1.715-.768 1.715-1.716v-7.61c1.61-.064 2.573-1.85 1.713-3.238l-.502-.81a2.12 2.12 0 0 0-1.802-1.004h-1.435v-.636A.986.986 0 0 0 12.953 2a2.445 2.445 0 0 0-2.444 2.446v3.456c-1.278.126-2.243.73-2.952 1.582c-.782.94-1.243 2.165-1.517 3.342c-.276 1.182-.373 2.358-.403 3.232c-.012.374-.012.696-.008.942H4.97a1.971 1.971 0 0 1-1.44-3.317l.92-.987a3.589 3.589 0 0 0-.086-4.984l-.903-.903a.5.5 0 1 0-.707.707l.903.903a2.587 2.587 0 0 1 .062 3.595l-.92.987A2.973 2.973 0 0 0 4.97 18zm7.97-15v1.122a.5.5 0 0 0 .5.5h1.934c.388 0 .748.2.952.53l.503.811a1.122 1.122 0 0 1-.953 1.713h-.41a.5.5 0 0 0-.5.5v8.108c0 .395-.32.716-.716.716h-.716v-.716a2.932 2.932 0 0 0-2.93-2.933H9.59a.5.5 0 0 0 0 1h1.013c1.067 0 1.932.865 1.932 1.933V17H6.629c-.005-.234-.005-.544.007-.909c.028-.836.12-1.94.377-3.038c.257-1.104.67-2.159 1.312-2.93c.627-.751 1.478-1.245 2.684-1.245a.5.5 0 0 0 .5-.5V4.446c0-.794.639-1.439 1.43-1.446z"
                                            />
                                        </g>
                                    </svg>
                                </n-icon>
                            </template>
                            Maybe search for cats
                        </n-button>
                    </n-flex>
                </div>
                <div v-show="(shownImagesCount > 0)">
                    <ImagesView  msg="Modular Image Board" @update:size="(count) => shownImagesCount = count"/>
                </div>
            </n-layout>
            <n-layout-footer
                :class="{ 'fixed-footer': isFooterFixed }"
                bordered
                style="height: 64px; padding: 24px;"
            >
                <n-space justify="center">
                    Made with ❤️ by 
                    <n-gradient-text type="danger">
                        nedius
                    </n-gradient-text>
                </n-space>
            </n-layout-footer>
        </n-layout>
        <n-layout-sider 
            bordered 
            show-trigger="bar" 
            collapse-mode="transform"
            :collapsed-width="0"
            :nativeScrollbar="false"
            :default-collapsed=menuCollapsed
            :collapsed=isCollapsed
            @collapse="settings.setSidebarOpen(false)"
            @expand="settings.setSidebarOpen(true)"
        >            
            <SideMenu />
        </n-layout-sider>
    </n-layout>
</template>

<style>
    #menu-scrollbar > .n-scrollbar > .n-scrollbar-container > .n-scrollbar-content{
        min-height: 100%;
    }
</style>

<style scoped>
    .fixed-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    #menu-content {
        min-width: 600px;
    }
    @media (max-width: 600px) {
        #menu-content {
            min-width: 320px ;
        }
    }
</style>