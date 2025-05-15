import Joi from 'joi';

export const createTenantSchema = Joi.object({
  organizationName: Joi.string().min(3).max(100).required(),
  subdomain: Joi.string().alphanum().min(3).max(30).required(),
});

export const updateTenantSchema = Joi.object({
  organizationName: Joi.string().min(3).max(100).optional(),
  isActive: Joi.boolean().optional(),
});
