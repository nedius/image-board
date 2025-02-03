<script setup>
// import { useCounterStore } from '../store/counter';
// import { computed } from 'vue';

defineProps({
    msg: String,
})

const counter = useCounterStore();
const count = computed(() => counter.count);
</script>

<template>
    <h1>{{ msg }}</h1>

    <div class="card">
        <p>{{ counter.count }}</p>
        <p>double the count {{ counter.double }}</p>
        <n-button @click="counter.increment()">increment is {{ count }}</n-button>
        <n-button @click="counter.decrement()">decrement is {{ count }}</n-button>
    </div>
</template>
