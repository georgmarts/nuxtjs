<template>
    <!-- <Suspense>
      <template #default>
      </template>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </Suspense> -->
    <div class="homepage">
          <Slideshow/>
          <h1>{{ posts }}</h1>
          <PostsGrid :posts="posts" :pending="pending"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import Slideshow from '~/components/Slideshow.vue';
  const {posts, pending, error} = useGetPosts()
    
  </script>

<style lang="scss">
  .homepage {
    margin: 50px auto 0 auto;
  }
</style>
