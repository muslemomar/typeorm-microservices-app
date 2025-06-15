import {
  Todo,
  User,
  validateRequest,
  EntityNotFoundError,
  requireAuth,
  currentUser,
  toTodoResponseDTO,
} from '@arbio/common';
import express, { Request, Response } from 'express';
import myDataSource from '../../db/data-source';
import { CreateTodoDTO } from '@arbio/common/build/dtos/todo.dto';
import { body } from 'express-validator';

const router = express.Router();

router.get(
  '/',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await myDataSource.getRepository(User).findOneOrFail({
      where: {
        id: req.currentUser!.id,
      },
    });

    const todos = await myDataSource.getRepository(Todo).find({
      where: {
        user: { id: user.id },
      },
    });

    res.send(todos.map(toTodoResponseDTO));
  },
);

router.post(
  '/',
  currentUser,
  requireAuth,
  validateRequest([
    body('title').trim().notEmpty().withMessage('Title is required'),
  ]),
  async (req: Request, res: Response) => {
    const { title } = req.body as CreateTodoDTO;

    const user = await myDataSource.getRepository(User).findOneOrFail({
      where: {
        id: req.currentUser!.id,
      },
    });

    const todo = myDataSource.getRepository(Todo).create({
      title,
      user: {
        id: user.id,
      },
    });
    await myDataSource.getRepository(Todo).save(todo);

    res.status(201).send(toTodoResponseDTO(todo));
  },
);

router.delete(
  '/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const user = await myDataSource.getRepository(User).findOneOrFail({
      where: {
        id: req.currentUser!.id,
      },
    });

    const todo = await myDataSource.getRepository(Todo).findOne({
      where: {
        id: Number(req.params.id),
        user: {
          id: user.id,
        },
      },
    });

    if (!todo) {
      throw new EntityNotFoundError('Todo not found');
    }

    await myDataSource.getRepository(Todo).remove(todo);

    res.status(204).send();
  },
);

export default router;
