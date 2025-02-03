<script setup>
const menuCollapsed = Math.max(window.screen.width, window.innerWidth) < 700;
</script>
<template>
    <n-layout has-sider position="absolute" style="top: 64px; bottom: 64px" sider-placement="right">
        <n-layout :native-scrollbar="false">
            <n-layout content-style="padding: 24px;">
                <HelloWorld msg="Modular Image Board" />
            </n-layout>
            <n-layout-footer
                bordered
                style="height: 64px; padding: 24px;"
            >
                <n-space justify="center">
                    Made with ❤️ by nedius
                </n-space>
            </n-layout-footer>
        </n-layout>
        <n-layout-sider 
            bordered 
            show-trigger="bar" 
            :collapsed-width="0"
            :default-collapsed=menuCollapsed
        >
            <p>side</p>
            <p>side</p>
            <p>side</p>
            <p>side</p>
            <p>side</p>
            <p>side</p>
        </n-layout-sider>
    </n-layout>
</template>

<style scoped>
    .n-layout {
        max-height: -webkit-fill-available;
    }
</style>