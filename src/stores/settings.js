import {defineStore } from "pinia"

export const useSettingsStore = defineStore("settings" , {
    state: () => ({
        theme: "auto", // "light" | "dark" | "auto"
        locale: "en", 
    }),
    actions: {
        setTheme(theme) {
            this.theme = theme;
        },
        setLocale(locale) {
            this.locale = locale;
        },
    },
    persist: true,
});