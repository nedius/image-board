<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import { computed, ref } from 'vue'
// import { darkTheme, useOsTheme, NButton, NConfigProvider } from 'naive-ui'
import { useSettingsStore } from './store/settings'

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
        <n-layout>
            <n-layout-header></n-layout-header>
            <n-layout-sider show-trigger>
            </n-layout-sider>
            <n-layout-content>
                <NButton @click="changeTheme">{{ settings.theme }}</NButton>
                <HelloWorld msg="Modular Image Board" />
            </n-layout-content>
            <n-layout-footer></n-layout-footer>
        </n-layout>
        <n-global-style />
    </n-config-provider>
</template>