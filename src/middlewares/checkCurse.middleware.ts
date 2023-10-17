import { Request, Response, NextFunction } from "express";
import { Course, CourseResult } from "../interfaces/course.schema";
import { getUserCourseService } from "../services/user.service";
import { client } from "../database";
import AppError from "../errors/App.error";

export const checkUserCoursesMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { courseName } = req.body;

  if (courseName) return next();

  const query: CourseResult = await client.query(
    'SELECT * FROM "courses" WHERE "name" = $1',
    [courseName]
  );

  if (query.rowCount !== 0) {
    throw new AppError("No course found", 404);
  }

  return next();
};
