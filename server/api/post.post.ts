import { supabase } from "~/lib/supabaseClient"
import { Post } from "~/types"
import { query } from "~/utils/mysqlQuery"

export default defineEventHandler(async (event) => {
    const body: Post = await readBody(event)
    const {status, statusText} = await supabase
    .from('posts')
    .insert({ id: body.id, title: body.title, body: body.body, createdAt: body.createdAt })
    // const queryCustom = 'INSERT INTO posts (id, title, body, createdAt) VALUES(?, ?, ?, ?)'
    // const values = [body.id, body.title, body.body, body.createdAt]
    // const response = await query(queryCustom, values)
    return {
       statusText
    }
})