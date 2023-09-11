import mysql from 'mysql2/promise'

export async function query(query, values) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        // port: '3306',
        user: 'root',
        password: 'password',
        database: 'blog'
    })
    try {
        const [results] = await connection.execute(query, values)
        connection.end()
        return results
    } catch (error) {
        return { error }
    }
}