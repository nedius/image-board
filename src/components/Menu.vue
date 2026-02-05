<script setup>
import ImagesView from './ImagesView.vue';

const menuCollapsed = Math.max(window.screen.width, window.innerWidth) < 700;
const isFooterFixed = computed(() =>{
    let menuContent = document.getElementById('menu-content') || 0;
    return menuContent.clientHeight < window.innerHeight - 64;
});
</script>

<template>
    <n-layout has-sider position="absolute" style="top: 64px;" sider-placement="right">
        <n-layout id="menu-scrollbar" :nativeScrollbar="false">
            <n-layout ref="menuContent" id="menu-content" content-style="padding: 24px;">
                <ImagesView msg="Modular Image Board" />
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
            :collapsed-width="0"
            :nativeScrollbar="false"
            :default-collapsed=menuCollapsed
        >
            <p v-for="item in [...Array(20).keys()]" :key="item.id">side filter</p>
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
</style>