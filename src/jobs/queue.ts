// jobs/queue.ts
import { Queue } from 'bullmq';
import { REDIS_URL } from '../config/env';
import { logger } from '../utils/logger';

const connection = {
  url: REDIS_URL,
};

export const emailQueue = new Queue('email-queue', { connection });
export const cleanupQueue = new Queue('cleanup-queue', { connection });

emailQueue.on('error', (err) => logger.error('Email Queue Error:', err));
cleanupQueue.on('error', (err) => logger.error('Cleanup Queue Error:', err));

// Add other queues here when needed
