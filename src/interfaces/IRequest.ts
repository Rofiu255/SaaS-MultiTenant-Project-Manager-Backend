// interfaces/IRequest.ts (or similar location)

import { Request } from 'express';
import { IJwtPayload } from './IJwtPayload';
import { ITenant } from './ITenant';       // Import the newly defined ITenant interface
import { IUser } from '../models/User';    // Import the IUser interface for the currentUser

/**
 * Custom Express request that carries user, tenant, and role info.
 */
export interface IRequest extends Request {
  user?: IJwtPayload;         // From JWT token (decoded)
  currentTenant?: ITenant;    // Injected after tenantMiddleware
  currentUser?: IUser;        // Optional, populated from DB
}
