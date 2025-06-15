import bcrypt from 'bcrypt';

export const compare = async (
  storedPassword: string,
  suppliedPassword: string,
) => {
  return await bcrypt.compare(suppliedPassword, storedPassword);
};
