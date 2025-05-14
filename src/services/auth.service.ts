import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { IUser } from '../types/user';
import { generateJWT } from '../utils/jwt';

export const registerService = async ({ name, email, password, tenantId }: { name: string, email: string, password: string, tenantId: string }) => {
  const existingUser = await UserModel(tenantId).findOne({ email });
  if (existingUser) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel(tenantId).create({ name, email, password: hashedPassword });
  return user;
};

export const loginService = async ({ email, password }: { email: string, password: string }) => {
  const user = await UserModel().findOne({ email }).select('+password'); // Cross-tenant login
  if (!user || !(await bcrypt.compare(password, user.password))) throw new Error('Invalid credentials');

  const token = generateJWT(user._id, user.tenantId);
  return { user, token };
};
