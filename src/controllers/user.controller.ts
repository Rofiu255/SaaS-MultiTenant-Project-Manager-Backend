import { Response } from 'express';
import {
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService
} from '../services/user.service';
import { asyncHandler } from '../utils/asyncHandler';
import { TenantRequest } from '../middleware/multiTenantMiddleware';

export const getUsers = asyncHandler(async (req: TenantRequest, res: Response) => {
  const users = await getUsersService(req.tenantId);
  res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req: TenantRequest, res: Response) => {
  const user = await getUserByIdService(req.params.id, req.tenantId);
  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req: TenantRequest, res: Response) => {
  const updatedUser = await updateUserService(req.params.id, req.body, req.tenantId);
  res.status(200).json({ message: 'User updated', user: updatedUser });
});

export const deleteUser = asyncHandler(async (req: TenantRequest, res: Response) => {
  await deleteUserService(req.params.id, req.tenantId);
  res.status(204).send();
});
