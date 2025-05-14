import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { REDIS_URL } from '../config/env';

const redisClient = new Redis(REDIS_URL);

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: 'Too many requests, please try again later.',
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(...args),
  }),
});
