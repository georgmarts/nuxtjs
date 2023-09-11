import { supabase } from "~/lib/supabaseClient"
import { Post } from "~/types"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const body: Post = await readBody(event)
    const {error} = await supabase
    .from('posts')
    .insert({ id: body.id, title: body.title, body: body.body, createdAt: body.createdAt })
    // const queryCustom = 'INSERT INTO posts (id, title, body, createdAt) VALUES(?, ?, ?, ?)'
    // const values = [body.id, body.title, body.body, body.createdAt]
    // const response = await query(queryCustom, values)
    // console.log(error)
    // console.log(data)
    if(error?.message) return { message: 'Something went wrong' }
    return {message: 'Post is added successfully'}
})