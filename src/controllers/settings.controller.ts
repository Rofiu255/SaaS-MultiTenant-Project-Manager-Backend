import { Request, Response } from 'express';
import { getSettingsService, updateSettingsService } from '../services/settings.service';
import { asyncHandler } from '../utils/asyncHandler';
import { TenantRequest } from '../middleware/multiTenantMiddleware';

/**
 * Get settings for a specific tenant.
 */
export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  const tenantId = (req as TenantRequest).tenantId;

  if (!tenantId) {
    return res.status(400).json({ message: 'Tenant ID is required' });
  }

  const settings = await getSettingsService(tenantId);
  res.status(200).json(settings);
});

/**
 * Update settings for a specific tenant.
 */
export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  const tenantId = (req as TenantRequest).tenantId;

  if (!tenantId) {
    return res.status(400).json({ message: 'Tenant ID is required' });
  }

  const updated = await updateSettingsService(tenantId, req.body);
  res.status(200).json({ message: 'Settings updated', updated });
});
