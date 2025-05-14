import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { BadRequestError } from '../utils/errors';

export const validate =
  (schema: ObjectSchema, property: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    next();
  };
