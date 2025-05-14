import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../config/env';
import { IJwtPayload } from '../interfaces/IJwtPayload';

export const signToken = (payload: IJwtPayload, expiresIn = '7d'): string =>
  jwt.sign(payload, JWT_SECRET, { expiresIn });

export const verifyToken = (token: string): IJwtPayload =>
  jwt.verify(token, JWT_SECRET) as IJwtPayload;

export const hashPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 12);

export const comparePassword = async (
  candidatePassword: string,
  hashedPassword: string
): Promise<boolean> => await bcrypt.compare(candidatePassword, hashedPassword);
