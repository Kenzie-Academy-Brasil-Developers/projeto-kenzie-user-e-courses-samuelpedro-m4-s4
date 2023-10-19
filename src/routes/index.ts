import { Router } from "express";
import { userRouter } from "./user.router";
import { coursesRouter } from "./course.router";
import { loginRouter } from "./login.router";

export const routes: Router = Router();

routes.use('/users', userRouter);
routes.use('/login', loginRouter);
routes.use('/courses', coursesRouter);