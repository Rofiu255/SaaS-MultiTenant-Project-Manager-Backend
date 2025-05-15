import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { multiTenantMiddleware } from '../middleware/multiTenantMiddleware';
import { validate } from '../middleware/validateMiddleware';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validators/task.validator';

const router = Router();

// Middleware for auth and tenant context
router.use(authMiddleware, multiTenantMiddleware);

// Routes
router.post('/', validate(createTaskSchema), taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export const taskRoutes = router;
