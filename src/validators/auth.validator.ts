import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const inviteUserSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid('Owner', 'Admin', 'Member').required(),
});


export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  
export const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
  });
  
