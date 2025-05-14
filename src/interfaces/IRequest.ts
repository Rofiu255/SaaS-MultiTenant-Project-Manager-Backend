import { Request } from 'express';
import { IJwtPayload } from './IJwtPayload';
import { ITenant } from '../models/Tenant'; // Interface or type from Tenant model
import { IUser } from '../models/User';     // Interface or type from User model

/**
 * Custom Express request that carries user, tenant, and role info.
 */
export interface IRequest extends Request {
  user?: IJwtPayload;         // From JWT token (decoded)
  currentTenant?: ITenant;    // Injected after tenantMiddleware
  currentUser?: IUser;        // Optional, populated from DB
}
