import { TaskModel } from '../models/Task';

export const createTaskService = async (data: any, tenantId: string) => {
  return await TaskModel(tenantId).create(data);
};

export const updateTaskStatusService = async (taskId: string, status: string, tenantId: string) => {
  const task = await TaskModel(tenantId).findByIdAndUpdate(taskId, { status }, { new: true });
  if (!task) throw new Error('Task not found');
  return task;
};

export const getTasksByProjectService = async (projectId: string, tenantId: string) => {
  return await TaskModel(tenantId).find({ project: projectId });
};
