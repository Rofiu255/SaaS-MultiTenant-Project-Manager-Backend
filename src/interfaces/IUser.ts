// src/interfaces/IUser.ts
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId; // ✅ Make this required (no `?`)
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'member';
  tenantId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
