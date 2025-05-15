import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { TenantModel } from '../models/Tenant';
import { TenantRequest } from '../middleware/multiTenantMiddleware';

// Create Tenant
export const createTenant = asyncHandler(async (req: Request, res: Response) => {
  const { name, domain } = req.body;
  const tenant = await TenantModel.create({ name, domain });
  res.status(201).json({ tenant });
});

// Get My Tenant
export const getMyTenant = asyncHandler(async (req: TenantRequest, res: Response) => {
  const tenantId = req.tenantId;
  const tenant = await TenantModel.findById(tenantId);
  if (!tenant) {
    return res.status(404).json({ message: 'Tenant not found' });
  }
  res.status(200).json({ tenant });
});

// Update Tenant
export const updateTenant = asyncHandler(async (req: TenantRequest, res: Response) => {
  const tenantId = req.tenantId;
  const updated = await TenantModel.findByIdAndUpdate(tenantId, req.body, { new: true });
  res.status(200).json({ tenant: updated });
});

// Delete Tenant
export const deleteTenant = asyncHandler(async (req: TenantRequest, res: Response) => {
  const tenantId = req.tenantId;
  await TenantModel.findByIdAndDelete(tenantId);
  res.status(204).send();
});
