import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middleware/validateMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/auth.validator';

const router = Router();

// Public routes (no authentication required)
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

// Protected routes (authentication required)
router.post('/invite', authMiddleware, authController.inviteUser);
router.post('/verify-email', authMiddleware, authController.verifyEmail);
router.post('/refresh-token', authMiddleware, authController.refreshToken);

export const authRoutes = router;
