import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {UserResponseDTO} from '../dtos/user.dto';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserResponseDTO;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserResponseDTO;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
