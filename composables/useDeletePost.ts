export default async function useDeletePost(postId: number | undefined) {
    const response = await $fetch(`/api/post?id=${postId}`, {
      method: 'delete'
    })
    refreshNuxtData('posts')
    return {
      response
    }
}