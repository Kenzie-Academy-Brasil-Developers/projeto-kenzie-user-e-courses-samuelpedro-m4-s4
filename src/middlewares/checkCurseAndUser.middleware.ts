import { Request, Response, NextFunction } from 'express';
import { enrollUserInCourseController } from '../controllers/course.controller';
import { userCourseResult } from '../interfaces/userCourse.interface';
import { client } from '../database';
import AppError from '../errors/App.error';

export const checkCourseAndUserExistenceMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { courseId, userId } = req.params;

    const courseQuery: userCourseResult = await client.query(
        'SELECT * FROM "courses" WHERE "id" = $1',
        [courseId]
    );

    const userQuery: userCourseResult = await client.query(
        'SELECT * FROM "users" WHERE "id" = $1',
        [userId]
    );

    if (courseQuery.rowCount === 0) {
        return next(new AppError('User/course not found', 404));
    }

    if (userQuery.rowCount === 0) {
        return next(new AppError('User/course not found', 404));
    }

    return next();
};
