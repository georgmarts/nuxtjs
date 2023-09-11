import { Post } from "~/types"

const useGetPosts = (postId: number | undefined) => {
    const {data: post, pending, error} = useFetch(`/api/post?id=${postId}`, {
        key: 'posts',
        transform: (data: {data: Post[]}) => {
          return data.data[0]
        } 
      })
    
    return { post, pending, error }
}

export default useGetPosts