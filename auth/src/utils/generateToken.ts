import jwt from 'jsonwebtoken';
import { UserResponseDTO } from '@arbio/common';

export function generateToken(payload: UserResponseDTO) {
  return jwt.sign(payload, process.env.JWT_KEY!, { noTimestamp: true });
}
