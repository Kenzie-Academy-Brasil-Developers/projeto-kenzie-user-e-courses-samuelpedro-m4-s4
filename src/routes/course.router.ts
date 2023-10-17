import { Router } from "express";
import { createCourseController, deleteUserEnrollmentController, enrollUserInCourseController, getAllCoursesController, getUsersByCourseController } from "../controllers/course.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { courseCreateSchema } from "../schemas/course.schema";
import { checkCourseAndUserExistenceMiddleware } from "../middlewares/checkCurseAndUser.middleware";

export const coursesRouter: Router = Router()

coursesRouter.post('/', verifyToken, verifyPermission, validateBody(courseCreateSchema), createCourseController);

coursesRouter.get('/', getAllCoursesController);

coursesRouter.post('/:courseId/users/:userId', verifyToken, verifyPermission,  checkCourseAndUserExistenceMiddleware, enrollUserInCourseController);

coursesRouter.delete('/:courseId/users/:userId', verifyToken, verifyPermission,  checkCourseAndUserExistenceMiddleware, deleteUserEnrollmentController);

coursesRouter.get('/:id/users', getUsersByCourseController);