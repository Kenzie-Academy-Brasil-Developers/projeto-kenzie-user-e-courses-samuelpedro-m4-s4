import { createCouseService, deleteUserEnrollmentService, enrollUserInCourseService, getAllCoursesService, getUsersByCourseService, } from "../services/course.service";
import { Response, Request } from "express";

export const createCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newCouse = await createCouseService(req.body);

  return res.status(201).json(newCouse);
};

export const getAllCoursesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courses = await getAllCoursesService();
  return res.status(200).json(courses);
};

export const enrollUserInCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courseId: number = parseInt(req.params.courseId);
  const userId: number = parseInt(req.params.userId);

  await enrollUserInCourseService(courseId, userId);

  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

export const deleteUserEnrollmentController = async (req: Request, res: Response): Promise<Response> => {
  await deleteUserEnrollmentService(req.params.courseId, req.params.userId,);
  return res.status(204).json();
};

export const getUsersByCourseController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courseId = req.params.id;
  const users = await getUsersByCourseService(courseId);
  return res.status(200).json(users);
};