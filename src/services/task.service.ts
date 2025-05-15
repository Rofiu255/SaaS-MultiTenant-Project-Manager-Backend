import { TaskModel } from '../models/Task';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { ITask } from '../interfaces/ITask';

export const createTaskService = async (data: Partial<ITask>, tenantId: string) => {
  if (!tenantId) throw new BadRequestError('Tenant ID is required');
  return await TaskModel(tenantId).create(data);
};

export const getAllTasksService = async (tenantId: string) => {
  if (!tenantId) throw new BadRequestError('Tenant ID is required');
  return await TaskModel(tenantId).find();
};

export const getTaskByIdService = async (taskId: string, tenantId: string) => {
  if (!tenantId) throw new BadRequestError('Tenant ID is required');
  const task = await TaskModel(tenantId).findById(taskId);
  if (!task) throw new NotFoundError('Task not found');
  return task;
};

export const updateTaskService = async (taskId: string, data: Partial<ITask>, tenantId: string) => {
  if (!tenantId) throw new BadRequestError('Tenant ID is required');
  const task = await TaskModel(tenantId).findByIdAndUpdate(taskId, data, { new: true });
  if (!task) throw new NotFoundError('Task not found');
  return task;
};

export const deleteTaskService = async (taskId: string, tenantId: string) => {
  if (!tenantId) throw new BadRequestError('Tenant ID is required');
  const result = await TaskModel(tenantId).findByIdAndDelete(taskId);
  if (!result) throw new NotFoundError('Task not found');
};

export const updateTaskStatusService = async (taskId: string, status: string, tenantId: string) => {
  if (!tenantId) throw new BadRequestError('Tenant ID is required');
  const task = await TaskModel(tenantId).findByIdAndUpdate(
    taskId,
    { status },
    { new: true }
  );
  if (!task) throw new NotFoundError('Task not found');
  return task;
};

export const getTasksByProjectService = async (projectId: string, tenantId: string) => {
  if (!tenantId) throw new BadRequestError('Tenant ID is required');
  return await TaskModel(tenantId).find({ project: projectId });
};
