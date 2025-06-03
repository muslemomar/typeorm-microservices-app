import { body } from 'express-validator';

export const signupValidator =   [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage('Password must should between 6 and 20 characters'),
];

export const loginValidator =   [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password'),
];
