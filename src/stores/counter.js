import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
    state: () => ({
        count: 4,
    }),
    getters: {
        double: (state) => state.count * 2,
    },
    actions: {
        increment() {
            //In vuex you will have to create a mutaion to do this directly
            //but, it's allowed here because pinia preaches flexibility
            this.count++;
        },
        decrement() {
            this.count--;
            if (this.count < 0) {
                this.count = 0;
            }
        },
    },
    persist: true,
});