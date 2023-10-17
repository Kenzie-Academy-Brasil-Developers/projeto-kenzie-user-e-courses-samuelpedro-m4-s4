import format from "pg-format";
import bcrypt from "bcrypt";
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

  const { password, ...userData } = data;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Incluindo hashedPassword no objeto userData
  const dataWithHashedPassword = {
    ...userData,
    password: hashedPassword,
  };

  const queryFormat: string = format(
    `INSERT INTO "users" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(dataWithHashedPassword), // Usando o objeto modificado com hashedPassword
    Object.values(dataWithHashedPassword)
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

  const queryResult: CourseResult = await client.query(queryString, [courseId]);

  return queryResult.rows;
};