<template>
    <div class="post-card">
        <img src="/post-image.jpg" alt="">
        <div class="post-card__body">
            <h2>{{ post?.title }}</h2>
            <p>{{ post?.body?.slice(0, 300) }}</p>
        </div>
        <div class="post-card__buttons">
            <NuxtLink :to="`post/${post?.id}`" style="all: unset;"><Button label="Read" width="70px"/></NuxtLink>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { PropType } from 'nuxt/dist/app/compat/capi';
    import { Post } from '~/types';

    const props = defineProps({
        post: Object as PropType<Post> 
    })

</script>
<style lang="scss">
        .post-card {
            position: relative;
            box-shadow: 1px 1px 2px -1px rgba(0, 0, 0, 0.719);
            background-color: white;
            border-radius: 1rem;
            overflow: hidden;
            height: 300px;
        img {
            object-fit: cover;
            width: 100%;
            height: 50%;
            overflow: hidden;
        }
        &__body {
           padding: 1rem;
           h2 {
            margin: 0;
           }
        }
        &__buttons {
            display: flex;
            gap: .5rem;
            align-items: center;
            position: absolute;
            left: 1rem;
            bottom: 1rem;
        }
        }
</style>