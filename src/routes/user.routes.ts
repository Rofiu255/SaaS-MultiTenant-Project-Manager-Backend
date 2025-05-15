import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { multiTenantMiddleware } from '../middleware/multiTenantMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { updateUserSchema } from '../validators/user.validator';

const router = Router();

// Apply auth and multi-tenant middleware globally
router.use(authMiddleware, multiTenantMiddleware);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validate(updateUserSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export const userRoutes = router;
