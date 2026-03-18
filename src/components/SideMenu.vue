<script setup>

const queryParams = useQueryStore();

</script>

<template>
    <!-- <p v-for="item in [...Array(20).keys()]" :key="item.id">side filter</p> -->
    <n-h2>Side Filter</n-h2>

    <n-h3>Tags</n-h3>
    <n-input v-model:value="queryParams.tags" type="textarea" placeholder="Enter tags..."/>

    <n-h3>Rating</n-h3>
    <n-select v-model:value="queryParams.rating" :options="[
        { label: 'None', value: 'none' },
        { label: 'Safe', value: 'sfw' },
        { label: 'NSFW', value: 'nsfw' },
    ]"/>

    <n-h3>Score</n-h3>
    <n-checkbox v-model:checked="queryParams.hasScore" />
    <n-input-number v-model:value="queryParams.score" :min="0"/>

    <n-h3>Limit</n-h3>
    <n-checkbox v-model:checked="queryParams.hasLimit" />
    <n-input-number v-model:value="queryParams.limit" :min="1" />

    <n-h3>Random</n-h3>
    <n-checkbox v-model:checked="queryParams.hasRandom" />
    <n-input-number v-model:value="queryParams.random" :min="1" />

    <n-flex justify="center">
        <n-button type="primary" style="display: block; margin: 1em auto;" @click="queryParams.doSearch()">Search</n-button>
        <n-button type="warning" style="display: block; margin: 1em auto;" @click="queryParams.doClear()">Clear</n-button>
    </n-flex>
</template>