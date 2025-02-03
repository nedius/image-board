<script setup>
import { useCounterStore } from '../stores/counter';
// import { computed } from 'vue';

defineProps({
    msg: String,
})

const counter = useCounterStore();
const count = computed(() => counter.count);

const randomString = () => {
    // return (Math.random() + 1).toString(36).substring(2) ;
    return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}
</script>

<template>
    <n-h1>{{ msg }}</n-h1>

    <p>count {{ counter.count }} ({{ counter.double }})</p>
    <n-button @click="counter.increment()">increment {{ count }}</n-button>
    <n-button @click="counter.decrement()">decrement {{ count }}</n-button>

    <p v-for="item in [...Array(count).keys()]" :key="item.id">
        {{ item + 1 }}: {{ randomString() }}
    </p>
</template>
