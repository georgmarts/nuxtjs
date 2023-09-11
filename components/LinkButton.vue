<template>
    <a :href="props.link" class="link-btn">{{ props.name }}</a>
</template>
<script setup lang="ts">

    const props = defineProps({
        link: String,
        name: String
    })

</script>
<style lang="scss">
    @use '../assets/scss/colors';
    .link-btn {
        all: unset;
        background-color: colors.$black;
        color: white;
        cursor: pointer;
        padding: .5rem 1rem;
        border-radius: .5rem;
        &:hover {
            box-shadow: 0 0 3px -1px black;
        }
    }
</style>