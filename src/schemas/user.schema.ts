import { z } from "zod";

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50).min(3),
    email: z.string().email({ message: 'Invalid email' }).max(50),
    password: z.string().max(120).min(6),
    admin: z.boolean().default(false),
})

export const userCreateSchema =  userSchema.omit({id: true});
export const userUpdateSchema = userCreateSchema.partial();