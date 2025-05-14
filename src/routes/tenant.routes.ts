import { Router } from 'express';
import * as tenantController from '../controllers/tenant.controller';
import { validate } from '../middleware/validateMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  createTenantSchema,
  updateTenantSchema,
} from '../validators/tenant.validator';

const router = Router();

// Create new tenant (no auth needed)
router.post('/', validate(createTenantSchema), tenantController.createTenant);

// Authenticated routes
router.use(authMiddleware);

router.get('/', tenantController.getMyTenant);
router.put('/', validate(updateTenantSchema), tenantController.updateTenant);
router.delete('/', tenantController.deleteTenant); // Optional

export const tenantRoutes = router;
