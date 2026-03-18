export const useSettingsStore = defineStore("settings" , {
    state: () => ({
        theme: "auto", // "light" | "dark" | "auto"
        locale: "en", 
        isSidebarOpen: false,
    }),
    actions: {
        setTheme(theme) {
            this.theme = theme;
        },
        setLocale(locale) {
            this.locale = locale;
        },
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        setSidebarOpen(isOpen) {
            this.isSidebarOpen = isOpen;
        }
    },
    persist: true,
});