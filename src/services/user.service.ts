import format from "pg-format";
import { User, UserCreateWithId, UserRead, UserResult,} from "../interfaces/user.interface";
import { client } from "../database";
import { CourseRead, CourseResult } from "../interfaces/course.schema";
import bcrypt from 'bcrypt';

export const createUserService = async (data: UserCreateWithId): Promise<User> => {
  const maxIdQuery = "SELECT MAX(id) FROM users";
  const maxIdResult = await client.query(maxIdQuery);
  const maxId = maxIdResult.rows[0].max || 0;
  data.id = maxId + 1;

  // Hash da senha antes de inserir no banco de dados
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const dataWithHashedPassword = { ...data, password: hashedPassword };

  const queryFormat: string = format(
    `INSERT INTO "users" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(dataWithHashedPassword),
    Object.values(dataWithHashedPassword)
  );

  const queryResult: UserResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

export const readUserService = async (): Promise<UserRead> => {
  const query: UserResult = await client.query('SELECT id, name, email, admin FROM "users";');
  return query.rows;
};

export const getUserCourseService = async (
  userId: string
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
    WHERE "u"."id" = $1;`;

  const queryResult: CourseResult = await client.query(queryString, [userId]);

  return queryResult.rows;
};