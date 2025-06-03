import {NextFunction, Request, Response} from 'express';
import {ValidationChain, validationResult} from 'express-validator';
import {RequestValidationError} from '../errors/request-validation-error';

export const validateRequest = (
    validators: ValidationChain[]
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        for (const validator of validators) {
            await validator.run(req);
        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        next();
    }
};
