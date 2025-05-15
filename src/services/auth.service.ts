// src/services/auth.service.ts

import bcrypt from 'bcrypt';
import { UserModel } from '../models/User';
import { IUser } from '../interfaces/IUser';
import { generateJWT } from '../utils/jwt';
import { BadRequestError, UnauthorizedError } from '../utils/errors'; // optional, if you use custom errors

// Payload type for register
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  tenantId: string;
}

// Payload type for login
interface LoginPayload {
  email: string;
  password: string;
  tenantId: string;
}

// ✅ Register a new user under a specific tenant
export const registerService = async ({
  name,
  email,
  password,
  tenantId,
}: RegisterPayload) => {
  const existingUser = await UserModel(tenantId).findOne({ email });
  if (existingUser) throw new BadRequestError('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel(tenantId).create({
    name,
    email,
    password: hashedPassword,
    tenantId,
  });

  const token = generateJWT(user._id.toString(), tenantId); // ensure string
  return { user, token };
};

// ✅ Login an existing user under the correct tenant
export const loginService = async ({
  email,
  password,
  tenantId,
}: LoginPayload) => {
  const user = await UserModel(tenantId).findOne({ email }).select('+password');
  if (!user) throw new UnauthorizedError('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new UnauthorizedError('Invalid credentials');

  const token = generateJWT(user._id.toString(), tenantId);
  return { user, token };
};
