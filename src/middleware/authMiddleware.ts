import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { Role } from '../interfaces/IRole';
import { IJwtPayload } from '../interfaces/IJwtPayload';

export interface AuthenticatedRequest extends Request {
  user?: IJwtPayload;
}

/**
 * Middleware: Authenticate JWT and attach user to request
 */
export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authentication token missing'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IJwtPayload;
    req.user = decoded;
    return next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid or expired token'));
  }
};

/**
 * Middleware: Authorize based on roles and/or permissions
 */
export const rbacMiddleware = (
  roles: Role[] = [],
  permissions: string[] = []
) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) return next(new UnauthorizedError('Not authenticated'));

    // Role check
    if (roles.length && !roles.includes(user.role as Role)) {
      return next(new ForbiddenError('Insufficient role'));
    }

    // Permission check
    if (permissions.length && !permissions.every(p => user.permissions?.includes(p))) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    return next();
  };
};
