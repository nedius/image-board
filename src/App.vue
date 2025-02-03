<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import { computed, ref } from 'vue'
// import { darkTheme, useOsTheme, NButton, NConfigProvider } from 'naive-ui'
import { darkTheme, useOsTheme } from 'naive-ui'
import { useSettingsStore } from './stores/settings'

const settings = useSettingsStore();
const osThemeRef = useOsTheme();
const theme = computed({
    get: () => {
        if (settings.theme === 'auto') {
            return osThemeRef.value === 'dark' ? darkTheme : null;
        } else if (settings.theme === 'dark') {
            return darkTheme;
        }
        return null;
    },
    set: (value) => settings.setTheme(value)
});
const changeTheme = () => {
    if (settings.theme === 'light') {
        theme.setter('dark');
    } else if (settings.theme === 'dark') {
        theme.setter('auto');
    } else {
        theme.setter('light');
    }
}

</script>

<template>
    <n-config-provider :theme="theme">
        <!-- <n-loading-bar-provider>
            <n-message-provider>
                <n-notification-provider>
                    <n-modal-provider>
                        <n-dialog-provider> -->
                            <!-- <n-space vertical size="large"> -->
                                <n-layout position="absolute">
                                    <n-layout-header bordered style="height: 64px; padding: 24px">
                                        <span>header</span>
                                        <NButton @click="changeTheme">{{ settings.theme }}</NButton>
                                    </n-layout-header>
                                    <Menu style="min-height: 100%;"></Menu>
                                </n-layout>
                            <!-- </n-space> -->
                        <!-- </n-dialog-provider>
                    </n-modal-provider>
                </n-notification-provider>
            </n-message-provider>
        </n-loading-bar-provider> -->
        <n-global-style />
    </n-config-provider>
</template>

<style scoped>
    .n-layout-header {
        padding: 24px;
    }
</style>