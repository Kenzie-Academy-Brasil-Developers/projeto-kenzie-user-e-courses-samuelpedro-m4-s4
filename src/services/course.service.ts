import { Course, CourseCreate, CourseRead, CourseResult } from "../interfaces/course.schema";
import { client } from "../database";
import format from "pg-format";
import { userCourseResult } from "../interfaces/userCourse.interface";
import { User, UserRead, UserResult } from "../interfaces/user.interface";


export const createCouseService = async (
    couseData: CourseCreate
  ): Promise<Course> => {
    const queryString: string = format(
      `INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;`,
      Object.keys(couseData),
      Object.values(couseData)
    );
  
    const queryResult: CourseResult = await client.query(queryString);
  
    return queryResult.rows[0];
};

export const getAllCoursesService = async (): Promise<CourseRead> => {
  const queryString = `
      SELECT 
          "id",
          "name",
          "description"
      FROM "courses";
  `;

  const queryResult: CourseResult = await client.query(queryString);
  return queryResult.rows;
};

export const enrollUserInCourseService = async (
  courseId: number,
  userId: number
): Promise<userCourseResult> => {
  const queryString = `
      INSERT INTO "userCourses" ("active", "userId", "courseId")
      VALUES (true, $1, $2)
      RETURNING *;
  `;

  const queryResult: userCourseResult = await client.query(queryString, [userId, courseId]);
  return queryResult;
};

export const inactiveUserEnrollmentService = async (
  courseId: string,
  userId: string
): Promise<void> => {

  await client.query(
    `UPDATE "userCourses" SET "active" = false WHERE "courseId" = $1 AND "userId" = $2`,
    [courseId, userId]
  );
};

export const getUsersByCourseService = async (
  courseId: string
): Promise<UserRead> => {
  const queryString = `
  SELECT 
    "u"."id" AS "userId",
    "u"."name" AS "userName",
    "c"."id" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "uc"."active" AS "userActiveInCourse"
  FROM "users" "u"
  JOIN "userCourses" "uc" ON "u"."id" = "uc"."userId"
  JOIN "courses" "c" ON "uc"."courseId" = "c"."id"
  WHERE "uc"."courseId" = $1
`;

  const queryResult: UserResult = await client.query(queryString, [
    courseId,
  ]);

  return queryResult.rows;
};