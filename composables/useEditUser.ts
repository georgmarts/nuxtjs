import { User } from "~/types"

export default async function useAddPost(updatedUser: User) {
    await $fetch('/api/user', {
      method: 'PATCH',
      body: updatedUser
    })
    refreshNuxtData('users')
  }