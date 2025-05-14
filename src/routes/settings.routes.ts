import { Router } from 'express';
import * as settingsController from '../controllers/settings.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { tenantMiddleware } from '../middleware/multiTenantMiddleware';

const router = Router();

router.use(authMiddleware, tenantMiddleware);

router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);

export const settingsRoutes = router;
