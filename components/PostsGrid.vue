<template>
    <main class="posts-container">
        <p v-if="pending">Loading...</p>
        <PostCard v-else v-for="post in posts" :post="post" />
    </main>
</template>
<script setup lang="ts">
    import { PropType } from 'nuxt/dist/app/compat/capi';
    import type { Post } from '../types'
    const props = defineProps({
        posts: Array as PropType<Post[] | null>,
        pending: Boolean
    })
</script>
<style lang="scss">
    .posts-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, 300px);
        justify-content: center;
        gap: 1rem;
        padding: 2rem;
        margin: auto;
    }
</style>