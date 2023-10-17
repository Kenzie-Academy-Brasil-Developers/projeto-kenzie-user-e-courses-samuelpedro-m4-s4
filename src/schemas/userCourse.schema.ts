import { z } from "zod";

export const userCoursesSchema = z.object({
    id: z.number().positive(),
    active: z.boolean().default(true),
    userId: z.number(),
    courseId: z.number()
});

export const userCourseCreateSchema = userCoursesSchema.omit({ id: true});
export const userCoursesUpdateSchema = userCourseCreateSchema.partial();