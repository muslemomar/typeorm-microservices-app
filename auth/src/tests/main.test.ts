import { generateToken } from '../utils/generateToken';
import jwt from 'jsonwebtoken';

describe('generateToken', () => {
  const mockJwtKey = 'testkey';

  beforeAll(() => {
    process.env.JWT_KEY = mockJwtKey;
  });

  it('returns a valid JWT', () => {
    const token = generateToken({
      id: 1,
      email: 'user@example.com',
    });
    const payload = jwt.verify(token, mockJwtKey);
    expect(payload).toMatchObject({ id: 1, email: 'user@example.com' });
  });
});
