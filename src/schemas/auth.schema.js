import { z } from 'zod'

export const registerSchema = z.object({
    userName: z.string({ required_error: 'Username is required' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'the password must have a minimum of 6 characters' })
})

export const loginSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
    password: z.string({ required_error: 'Password is required' }).min(6, { message: 'the password must have a minimum of 6 characters' })
})