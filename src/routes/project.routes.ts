import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { multiTenantMiddleware } from '../middleware/multiTenantMiddleware';
import { validate } from '../middleware/validateMiddleware';
import {
  createProjectSchema,
  updateProjectSchema,
} from '../validators/project.validator';

const router = Router();

router.use(authMiddleware, multiTenantMiddleware);

router.post('/', validate(createProjectSchema), projectController.createProject);
router.get('/', projectController.getProjects); // or getAllProjects if you renamed it
router.get('/:id', projectController.getProjectById);
router.put('/:id', validate(updateProjectSchema), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export const projectRoutes = router;

