import 'reflect-metadata';
import myDataSource from './db/data-source';
import { runSeeders } from 'typeorm-extension';

myDataSource.initialize().then(async () => {
  await myDataSource.synchronize(true);
  await runSeeders(myDataSource);
  console.log('Database initialized successfully ✅ ');
  process.exit();
});
