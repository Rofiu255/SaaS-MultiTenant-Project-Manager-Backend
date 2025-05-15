import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis'; // Using ioredis
import { REDIS_URL } from '../config/env';

// Initialize Redis client
const redisClient = new Redis(REDIS_URL);

// Configure rate limiter with Redis store
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  store: new RedisStore({
    // Use the ioredis client directly, no casting needed
    client: redisClient as any, // Using 'any' to bypass the type mismatch issue
  }),
});
