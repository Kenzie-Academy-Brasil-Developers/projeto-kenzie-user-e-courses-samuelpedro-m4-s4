import { QueryResult } from "pg";
import { courseCreateSchema, courseSchema, courseUpdateSchema } from "../schemas/course.schema";
import { z } from "zod";


export type Course = z.infer<typeof courseSchema>

export type CourseCreate = z.infer<typeof courseCreateSchema>
export type CourseRead = Array<Course>;
export type CourseUpdate = z.infer<typeof courseUpdateSchema>
export type CourseResult = QueryResult<Course>;