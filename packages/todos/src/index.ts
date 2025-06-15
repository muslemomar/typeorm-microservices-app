import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import todosRouter from './routes/todos';
import connectDataSource from './db/connectDataSource';
import { errorHandler, NotFoundError } from '@arbio/common';

connectDataSource();

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  }),
);

app.use('/api/todos', todosRouter);

app.all('/', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3001, () => {
  console.log('Listening on port 3001 ');
});

export default app;
