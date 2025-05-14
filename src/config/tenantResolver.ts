import { Request, Response, NextFunction } from 'express';

/**
 * Resolves tenant from subdomain, header, or JWT claims.
 * Attaches `tenantId` to request object.
 */
export const resolveTenant = (req: Request, res: Response, next: NextFunction): void => {
  const tenantHeader = req.headers['x-tenant-id'] as string;
  const subdomain = req.hostname.split('.')[0]; // e.g., tenant1.saas.com → tenant1
  const tenantId = tenantHeader || subdomain;

  if (!tenantId) {
    res.status(400).json({ message: 'Tenant ID is missing in headers or subdomain' });
    return;
  }

  (req as any).tenantId = tenantId;
  next();
};
