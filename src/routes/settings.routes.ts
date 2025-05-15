import { Router } from 'express';
import * as settingsController from '../controllers/settings.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { multiTenantMiddleware } from '../middleware/multiTenantMiddleware';

const router = Router();

router.use(authMiddleware, multiTenantMiddleware);

router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);

export const settingsRoutes = router;
