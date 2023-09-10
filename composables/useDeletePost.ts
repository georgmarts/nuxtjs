export default async function useDeletePost(postId: number | undefined) {
    await $fetch(`/api/post?id=${postId}`, {
      method: 'DELETE'
    })
    refreshNuxtData('posts')
}