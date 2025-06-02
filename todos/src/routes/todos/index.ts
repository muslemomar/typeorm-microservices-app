import {
  Todo,
  validateRequest,
  EntityNotFoundError,
  requireAuth,
  currentUser,
  toTodoResponseDTO,
} from '@arbio/common';
import express, { Request, Response } from 'express';
import myDataSource from '../../db/data-source';
import { CreateTodoDTO } from '@arbio/common/build/dtos/todo.dto';
import { createTodoValidator } from '@arbio/common/build/validators/todo';

const router = express.Router();

router.get(
  '/',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const todos = await myDataSource.getRepository(Todo).find({
      where: {
        user: { id: req.currentUser!.id },
      },
    });

    res.send(todos.map(toTodoResponseDTO));
  },
);

router.post(
  '/',
  currentUser,
  requireAuth,
  validateRequest(createTodoValidator),
  async (req: Request, res: Response) => {
    const { title } = req.body as CreateTodoDTO;

    const todo = myDataSource.getRepository(Todo).create({
      title,
      user: {
        id: req.currentUser!.id,
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
    const todo = await myDataSource.getRepository(Todo).findOne({
      where: {
        id: Number(req.params.id),
        user: {
          id: req.currentUser!.id,
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
