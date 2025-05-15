import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import {
  createProjectService,
  getProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
} from '../services/project.service';

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const project = await createProjectService(req.body, tenantId);
  res.status(201).json({ message: 'Project created', project });
});

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const projects = await getProjectsService(tenantId);
  res.status(200).json(projects);
});

export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const project = await getProjectByIdService(req.params.id, tenantId);
  res.status(200).json(project);
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const updated = await updateProjectService(req.params.id, req.body, tenantId);
  res.status(200).json({ message: 'Project updated', project: updated });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  await deleteProjectService(req.params.id, tenantId);
  res.status(204).send(); // No content
});
