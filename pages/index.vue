<template>
    <div class="homepage">
          <Slideshow/>
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