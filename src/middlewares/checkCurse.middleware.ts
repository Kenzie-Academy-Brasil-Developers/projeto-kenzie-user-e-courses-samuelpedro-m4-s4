import { Request, Response, NextFunction } from "express";
import AppError from "../errors/App.error";
import { getUserCourseService } from "../services/user.service";

export const checkUserCoursesMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const courses = await getUserCourseService(id);

  if (courses.length === 0) {
    throw new AppError("No course found", 404);
  }

  return next();
};
