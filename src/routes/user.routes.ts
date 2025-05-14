// src/routes/user.routes.ts

import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { multiTenantMiddleware } from '../middleware/multiTenantMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { updateUserSchema } from '../validators/user.validator';

const router = Router();

// Apply authentication and tenant resolution globally to all user routes
router.use(authMiddleware, multiTenantMiddleware);

// GET /api/users - List all users
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// PUT /api/users/:id - Update user by ID with validation
router.put('/:id', validate(updateUserSchema), userController.updateUser);

// DELETE /api/users/:id - Delete user by ID
router.delete('/:id', userController.deleteUser);

export const userRoutes = router;
