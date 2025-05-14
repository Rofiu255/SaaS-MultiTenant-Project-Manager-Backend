import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import { logger } from '../utils/logger';

/**
 * Sets up Swagger UI for API documentation
 * Accessible at: /api-docs
 */
export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  logger.info('📚 Swagger docs available at /api-docs');
};
