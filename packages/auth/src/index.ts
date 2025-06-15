import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import usersRouter from './routes/users';
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

app.use('/api/users', usersRouter);

app.all('/', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

export { app };
