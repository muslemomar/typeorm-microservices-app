import { body } from 'express-validator';

export const createTodoValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
];
