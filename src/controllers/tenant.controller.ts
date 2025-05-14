import { Response } from 'express';
import { createTenantService, getTenantService } from '../services/tenant.service';
import { asyncHandler } from '../utils/asyncHandler';
import { TenantRequest } from '../middleware/multiTenantMiddleware';

export const createTenant = asyncHandler(async (req: TenantRequest, res: Response) => {
  // Destructure body for name and ownerEmail if necessary
  const { name, ownerEmail } = req.body;
  
  // Call the service to create a tenant
  const tenant = await createTenantService({ name, ownerEmail });
  
  // Return the created tenant in response
  res.status(201).json({ message: 'Tenant created', tenant });
});

export const getTenant = asyncHandler(async (req: TenantRequest, res: Response) => {
  // Use tenantId from the middleware
  const tenantId = req.tenantId;

  // Call the service to retrieve the tenant by ID
  const tenant = await getTenantService(tenantId);

  // Return the tenant in the response
  res.status(200).json({ tenant });
});
