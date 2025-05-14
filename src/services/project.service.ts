import { ProjectModel } from '../models/Project';

export const createProjectService = async (data: any, tenantId: string) => {
  return await ProjectModel(tenantId).create(data);
};

export const getProjectsService = async (tenantId: string) => {
  return await ProjectModel(tenantId).find();
};

export const getProjectByIdService = async (id: string, tenantId: string) => {
  const project = await ProjectModel(tenantId).findById(id);
  if (!project) throw new Error('Project not found');
  return project;
};

export const updateProjectService = async (id: string, data: any, tenantId: string) => {
  const updated = await ProjectModel(tenantId).findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error('Project not found or update failed');
  return updated;
};

export const deleteProjectService = async (id: string, tenantId: string) => {
  const result = await ProjectModel(tenantId).findByIdAndDelete(id);
  if (!result) throw new Error('Project not found or delete failed');
};
