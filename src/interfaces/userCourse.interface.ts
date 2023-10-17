import { userCourseCreateSchema } from './../schemas/userCourse.schema';
import { z } from "zod";
import { userCoursesSchema, userCoursesUpdateSchema } from "../schemas/userCourse.schema";
import { QueryResult } from "pg";


export type userCourse = z.infer<typeof userCoursesSchema>

export type userCourseCreate = z.infer<typeof userCourseCreateSchema>
export type userCourseRead = Array<userCourse>;
export type userCourseUpdate = z.infer<typeof userCoursesUpdateSchema>
export type userCourseResult = QueryResult<userCourse>;
