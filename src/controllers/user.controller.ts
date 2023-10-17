import { userCourse } from './../interfaces/userCourse.interface';
import { Course, CourseRead } from './../interfaces/course.schema';
import { Request, Response } from "express";
import { RequestUser, User, UserRead, UserWithoutPassword } from "../interfaces/user.interface";
import { createUserService, getUserCourseService, readUserService } from "../services/user.service";

export const createUserController = async (
  req: Request<{}, {}, RequestUser>,
  res: Response
): Promise<Response> => {
  const user: User = await createUserService(req.body);
  
  //// Omiti o campo de senha da resposta da requisição ////

  const { password, ...userWithoutPassword }: UserWithoutPassword = user;

  return res.status(201).json(userWithoutPassword);
};

export const readUserController = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await readUserService();
  return res.status(200).json(users);
};

export const getUserCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const Courses: CourseRead = await getUserCourseService(req.params.courseId);
  return res.status(200).json(Courses);
};