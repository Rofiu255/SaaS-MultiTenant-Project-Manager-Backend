import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../utils/errors';

/**
 * Extends the Express Request interface to include tenantId.
 */
export interface TenantRequest extends Request {
  tenantId: string;  // Ensure tenantId is included in the request
}

/**
 * Middleware to extract tenant ID from headers and attach it to the request object.
 */
export const multiTenantMiddleware = (
  req: Request,  // Use base Request type
  res: Response,
  next: NextFunction
): void => {
  const tenantId = req.headers['x-tenant-id'];

  // Validate that tenantId exists and is of type string
  if (!tenantId || typeof tenantId !== 'string') {
    return next(new BadRequestError('Tenant ID is missing or invalid in the request headers.'));
  }

  // Attach tenantId to the request object and cast it to TenantRequest
  (req as TenantRequest).tenantId = tenantId;

  // Proceed to the next middleware
  next();
};
