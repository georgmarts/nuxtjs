export interface Post {
    id?: number, 
    title: string | undefined,
    body: string | undefined,
    createdAt?: string,
    updatedAt?: string
}

export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    email?: string,
    phoneNumber: string,
    password: string,
    confirmPassword? : string
}

export type MySQLResponse = {
    error?: {
        code: string
    }
}