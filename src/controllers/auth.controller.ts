import { Request, Response } from 'express';
import { registerService, loginService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { TenantRequest } from '../middleware/multiTenantMiddleware';

/**
 * User registration controller.
 * Requires tenant ID from middleware.
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const tenantId = (req as TenantRequest).tenantId;
  if (!tenantId) {
    return res.status(400).json({ message: 'Tenant ID is required' });
  }

  const user = await registerService({
    name,
    email,
    password,
    tenantId,
  });

  res.status(201).json({ message: 'Registration successful', user });
});

/**
 * User login controller.
 * Tenant-aware authentication (optional depending on use case).
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const tenantId = (req as TenantRequest).tenantId;
  if (!tenantId) {
    return res.status(400).json({ message: 'Tenant ID is required' });
  }

  const { token, user } = await loginService({ email, password, tenantId });

  res.status(200).json({ token, user });
});


export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    // You'd send a reset link here
    res.status(200).json({ message: `Password reset link sent to ${email}` });
  });
  
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    // You'd verify token and update password here
    res.status(200).json({ message: 'Password has been reset' });
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    // You'd verify the email token here
    res.status(200).json({ message: 'Email verified successfully' });
});

export const inviteUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, role } = req.body;
    // Create invitation logic here
    res.status(201).json({ message: `Invitation sent to ${email}` });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    // Logic to refresh token here
    res.status(200).json({ token: 'new-jwt-token' });
});
