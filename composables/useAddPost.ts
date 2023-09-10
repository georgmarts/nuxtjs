import { Post } from "~/types"

export default async function useAddPost(newPost: Post) {
    $fetch('/api/post', {
      method: 'POST',
      body: newPost
    })
    refreshNuxtData('posts')
  }