import myDataSource from './data-source';

const connectDataSource = async () => {
  try {
    await myDataSource.initialize();
    console.log('Data Source has been initialized!!');
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
    throw err;
  }
};

export default connectDataSource;
