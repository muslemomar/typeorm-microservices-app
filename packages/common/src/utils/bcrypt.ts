import bcrypt from 'bcrypt';

export const toHash = async (password: string) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
