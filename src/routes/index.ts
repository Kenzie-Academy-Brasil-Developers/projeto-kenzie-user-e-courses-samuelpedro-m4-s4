import { Router } from "express";
import { userRouter } from "./user.router";
import { coursesRouter } from "./course.router";

export const routes: Router = Router();

routes.use('/users', userRouter);
routes.use('/courses', coursesRouter);