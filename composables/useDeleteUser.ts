export default async function useDeleteUser(userId: number | undefined) {
    await $fetch(`/api/user?id=${userId}`, {
      method: 'DELETE'
    })
    refreshNuxtData('users')
}