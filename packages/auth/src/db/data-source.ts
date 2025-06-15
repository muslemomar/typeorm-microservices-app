import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from '@arbio/common';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: ['src/db/migration/*.{ts,js}'],
  factories: ['src/db/seeding/factories/*.{ts,js}'],
  seeds: ['src/db/seeding/seeds/*.{ts,js}'],
  logging: false,
  synchronize: process.env.NODE_ENV !== 'production',
};

const myDataSource = new DataSource(options);
export default myDataSource;
