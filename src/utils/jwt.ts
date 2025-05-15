// src/utils/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';
const JWT_EXPIRES_IN = '7d';

export const generateJWT = (userId: string, tenantId: string): string => {
  return jwt.sign({ userId, tenantId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyJWT = (token: string): { userId: string; tenantId: string } => {
  return jwt.verify(token, JWT_SECRET) as { userId: string; tenantId: string };
};
