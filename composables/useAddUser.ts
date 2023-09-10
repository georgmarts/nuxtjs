import { User } from "~/types"

export default async function useAddPost(newUser: User) {
    const {data: response, pending, status, error} = await useFetch('/api/user', {
      method: 'POST',
      body: newUser
    })
    refreshNuxtData('users')
    return { response, status, pending, error }
  }