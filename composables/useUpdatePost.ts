import { Post } from "~/types"

export default async function useUpdatePost(newPost: Post) {
    const response = await $fetch('/api/post', {
      method: 'PUT',
      body: newPost
    })
    refreshNuxtData('posts')
    return { response }
  }