import { Post } from "~/types"

export default async function useAddPost(newPost: Post) {
    const response = $fetch('/api/post', {
      method: 'POST',
      body: newPost
    })
    refreshNuxtData('posts')
    return { response }
  }