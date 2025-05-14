import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('').max(1000),
  projectId: Joi.string().hex().length(24).required(),
  assignee: Joi.string().hex().length(24).optional(),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
  parentTask: Joi.string().hex().length(24).optional(), // for subtasks
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  description: Joi.string().allow('').max(1000),
  assignee: Joi.string().hex().length(24).optional(),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid('low', 'medium', 'high'),
  status: Joi.string().valid('todo', 'in-progress', 'done', 'archived'),
});
