import { UserModel } from '../models/User';
import { BadRequestError, NotFoundError } from '../utils/errors';
import  { IUser }  from '../interfaces/IUser'; // assuming you have this

export const getUsersService = async (tenantId: string) => {
  if (!tenantId) throw new BadRequestError('Tenant ID is required');
  return await UserModel(tenantId).find({});
};

export const getUserByIdService = async (id: string, tenantId: string) => {
  const user = await UserModel(tenantId).findById(id);
  if (!user) throw new NotFoundError('User not found');
  return user;
};

export const updateUserService = async (id: string, data: Partial<IUser>, tenantId: string) => {
  const updated = await UserModel(tenantId).findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new NotFoundError('User not found');
  return updated;
};

export const deleteUserService = async (id: string, tenantId: string) => {
  const result = await UserModel(tenantId).findByIdAndDelete(id);
  if (!result) throw new NotFoundError('User not found');
};
