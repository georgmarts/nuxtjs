import { User } from "~/types"

const useGetUser = (userId: number | undefined) => {
    const {data: user, pending} = useFetch(`/api/user?id=${userId}`, {
        key: 'users',
        transform: (data: {data: User[]}) => {
          return data.data[0]
        } 
      })
    
    return { user, pending }
}

export default useGetUser