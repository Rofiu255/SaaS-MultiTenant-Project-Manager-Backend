import { UserModel } from '../models/User';

export const getUsersService = async (tenantId: string) => {
  return await UserModel(tenantId).find({});
};

export const getUserByIdService = async (id: string, tenantId: string) => {
  const user = await UserModel(tenantId).findById(id);
  if (!user) throw new Error('User not found');
  return user;
};
