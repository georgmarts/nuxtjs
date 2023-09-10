import { Post } from "~/types"

export default async function useUpdatePost(newPost: Post) {
    await $fetch('/api/post', {
      method: 'PUT',
      body: newPost
    })
    refreshNuxtData('posts')
  }