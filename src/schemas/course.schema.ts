import { z } from "zod";

export const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(15).min(3),
    description: z.string().max(50).min(3)
})

export const courseCreateSchema =  courseSchema.omit({id: true});
export const courseUpdateSchema = courseCreateSchema.partial();