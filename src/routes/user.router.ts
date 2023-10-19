import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/user.schema";
import { createUserController, getUserCourseController, readUserController } from "../controllers/user.controller";
import { uniqueEmail } from "../middlewares/uniqueEmail.middlewares";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { checkUserCoursesMiddleware } from "../middlewares/checkCurse.middleware";

export const userRouter: Router = Router();

userRouter.post("/", validateBody(userCreateSchema), uniqueEmail, createUserController);

userRouter.get("/", verifyToken, verifyPermission, readUserController);

userRouter.get("/:id/courses", verifyToken, verifyPermission,checkUserCoursesMiddleware,  getUserCourseController)
