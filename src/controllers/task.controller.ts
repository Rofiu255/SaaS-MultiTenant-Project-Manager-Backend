import { Response } from 'express';
import {
  createTaskService,
  updateTaskStatusService,
  getTasksByProjectService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService
} from '../services/task.service';
import { asyncHandler } from '../utils/asyncHandler';
import { TenantRequest } from '../middleware/multiTenantMiddleware';

export const createTask = asyncHandler(async (req: TenantRequest, res: Response) => {
  const task = await createTaskService(req.body, req.tenantId);
  res.status(201).json({ message: 'Task created', task });
});

export const getAllTasks = asyncHandler(async (req: TenantRequest, res: Response) => {
  const tasks = await getAllTasksService(req.tenantId);
  res.status(200).json(tasks);
});

export const getTaskById = asyncHandler(async (req: TenantRequest, res: Response) => {
  const task = await getTaskByIdService(req.params.id, req.tenantId);
  res.status(200).json(task);
});

export const updateTask = asyncHandler(async (req: TenantRequest, res: Response) => {
  const task = await updateTaskService(req.params.id, req.body, req.tenantId);
  res.status(200).json({ message: 'Task updated', task });
});

export const deleteTask = asyncHandler(async (req: TenantRequest, res: Response) => {
  await deleteTaskService(req.params.id, req.tenantId);
  res.status(200).json({ message: 'Task deleted' });
});

export const updateTaskStatus = asyncHandler(async (req: TenantRequest, res: Response) => {
  const task = await updateTaskStatusService(req.params.id, req.body.status, req.tenantId);
  res.status(200).json({ message: 'Task status updated', task });
});
