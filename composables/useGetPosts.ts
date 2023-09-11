import { Post } from "~/types"

const useGetPosts = () => {
    const {data: posts, pending, error} = useFetch('/api/posts', {
        key: 'posts',
        transform: (data: {data: Post[]}) => {
          return data.data
        }
      })
    
    return { posts, pending, error }
}


export default useGetPosts