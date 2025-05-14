import Joi from 'joi';

export const createProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('').max(500),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  members: Joi.array().items(Joi.string().hex().length(24)), // user IDs
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().allow('').max(500),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  members: Joi.array().items(Joi.string().hex().length(24)),
  status: Joi.string().valid('active', 'completed', 'archived'),
});
