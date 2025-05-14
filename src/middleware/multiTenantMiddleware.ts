import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../utils/errors';

/**
 * Extends the Express Request interface to include tenantId.
 */
export interface TenantRequest extends Request {
  tenantId: string;
}

/**
 * Middleware to resolve tenant ID from request headers.
 * Expects 'x-tenant-id' header to be present in the request.
 */
export const multiTenantMiddleware = (
  req: TenantRequest,
  res: Response,
  next: NextFunction
): void => {
  const tenantId = req.headers['x-tenant-id'];

  if (!tenantId || typeof tenantId !== 'string') {
    return next(new BadRequestError('Tenant ID is missing or invalid in the request headers.'));
  }

  req.tenantId = tenantId;
  next();
};
