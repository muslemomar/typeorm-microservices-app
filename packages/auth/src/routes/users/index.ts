import {
  BadRequestError,
  requireAuth,
  SignupDTO,
  LoginDTO,
  validateRequest,
  User,
  toUserResponseDTO,
  currentUser,
} from '@arbio/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import myDataSource from '../../db/data-source';
import { generateToken } from '../../utils/generateToken';
import { compare } from '../../utils/bcrypt';

const router = express.Router();

router.get('/me', currentUser, requireAuth, (req, res) => {
  res.send(req.currentUser);
});

router.post(
  '/login',
  validateRequest([
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ]),
  async (req: Request, res: Response) => {
    const { email, password } = req.body as SignupDTO;

    const existingUser = await myDataSource.getRepository(User).findOne({
      where: { email },
    });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await compare(existingUser.password, password);

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    const userJwt = generateToken({
      id: existingUser.id,
      email: existingUser.email,
    });
    req.session = { jwt: userJwt };

    res.status(200).send(toUserResponseDTO(existingUser));
  },
);

router.post(
  '/signup',
  validateRequest([
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must should between 6 and 20 characters'),
  ]),
  async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginDTO;
    const existingUser = await myDataSource.getRepository(User).findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = myDataSource.getRepository(User).create({ email, password });
    await myDataSource.getRepository(User).save(user);

    const userJwt = generateToken({ id: user.id, email: user.email });
    req.session = { jwt: userJwt };

    res.status(201).send(toUserResponseDTO(user));
  },
);

router.post('/logout', currentUser, requireAuth, (req, res) => {
  req.session = null;

  res.send({});
});

export default router;
