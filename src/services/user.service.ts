import format from "pg-format";
import { User, UserCreateWithId, UserRead, UserResult,} from "../interfaces/user.interface";
import { client } from "../database";
import { CourseRead, CourseResult } from "../interfaces/course.schema";

export const createUserService = async (
  data: UserCreateWithId
): Promise<User> => {
  const maxIdQuery = "SELECT MAX(id) FROM users";
  const maxIdResult = await client.query(maxIdQuery);
  const maxId = maxIdResult.rows[0].max || 0;
  data.id = maxId + 1;

  const queryFormat: string = format(
    `INSERT INTO "users" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data), // Usando o objeto modificado com hashedPassword
    Object.values(data)
  );

  const queryResult: UserResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const readUserService = async (): Promise<UserRead> => {
  const query: UserResult = await client.query('SELECT * FROM "users";');
  return query.rows;
};

export const getUserCourseService = async (
  courseId: string
): Promise<CourseRead> => {
  const queryString = `
  SELECT 
    "c"."id" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description" AS "courseDescription",
    "u"."id" AS "userId",
    "u"."name" AS "userName",
    "uc"."active" AS "userActiveInCourse"
  FROM "courses" "c"
  JOIN "userCourses" "uc" ON "c"."id" = "uc"."courseId"
  JOIN "users" "u" ON "uc"."userId" = "u"."id"
  WHERE "uc"."courseId" = $1;`;

  const queryResult: CourseResult = await client.query(queryString, [courseId]);

  return queryResult.rows;
};