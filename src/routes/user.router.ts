import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/user.schema";
import { createUserController, getUserCourseController, readUserController } from "../controllers/user.controller";
import { uniqueEmail } from "../middlewares/uniqueEmail.middlewares";
import { loginSchema } from "../schemas/login.schema";
import { loginController } from "../controllers/login.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { checkUserCoursesMiddleware } from "../middlewares/checkCurse.middleware";

export const userRouter: Router = Router();

userRouter.post("/", validateBody(userCreateSchema), uniqueEmail, createUserController);

userRouter.post("/login", validateBody(loginSchema), loginController);

userRouter.get("/", verifyToken, verifyPermission, readUserController);

userRouter.get("/:courseId/courses", verifyToken, verifyPermission,checkUserCoursesMiddleware, getUserCourseController)
