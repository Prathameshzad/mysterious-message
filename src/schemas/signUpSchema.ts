import {z} from "zod";

const usernameValidation = z
            .string()
            .min(2,"Username must be alleast 2 characters")
            .max(20, "Username must be no more than 20 characters")
            .regex(/^[a-zA-Z0-9_]+$/,'Username must not contain special character')

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(6,{message:"passowrd must be at least 6 characters"})
})