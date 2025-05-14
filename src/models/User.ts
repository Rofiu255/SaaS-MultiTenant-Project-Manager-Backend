import { Schema, model, Model } from 'mongoose';
import { getTenantDb } from '../config/db';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'member';
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'manager', 'member'], default: 'member' },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = (tenantId: string): Model<IUser> => {
  const db = getTenantDb(tenantId);
  return db.models.User || db.model<IUser>('User', userSchema);
};
