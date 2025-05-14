import { Request, Response } from 'express';
import { createProjectService, getProjectsService } from '../services/project.service';
import { asyncHandler } from '../utils/asyncHandler';

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
