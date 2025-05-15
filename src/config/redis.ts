import { createClient } from 'redis';
import { REDIS_URL } from './env';
import { logger } from '../utils/logger';

export const redisClient = createClient({
  url: REDIS_URL,
});

export const connectRedis = async (): Promise<void> => {
  redisClient.on('error', (err) => logger.error('Redis connection error:', err));
  redisClient.on('connect', () => logger.info('Redis connected successfully'));

  await redisClient.connect();
};
