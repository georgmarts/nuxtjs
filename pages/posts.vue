<template>
    <main>
        <div class="postspage">
            <NuxtLink to="/addpost" style="all: unset;" v-show="session?.user" class="postspage__write-btn"><Button class="postspage__write-btn" label="Write a new post" width="200px"/></NuxtLink>
            <PostsGrid :posts="posts" :pending="pending"/>
        </div>
    </main>
</template>
<script setup lang="ts">
    const { data: session } = useAuth()
    const { posts, pending } = useGetPosts()
</script>
<style lang="scss">
    .postspage {
        margin: 70px auto 0 auto;
        width: 95vw;
        &__write-btn {
            display: block;
            margin: 0 auto;
        }
    }
</style>