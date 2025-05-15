// jobs/cleanupProcessor.ts
import { Worker } from 'bullmq';
import { REDIS_URL } from '../config/env';
import { logger } from '../utils/logger';
import NotificationModel from '../models/Notification';


interface CleanupJobData {
  tenantId: string;
  type: 'notifications' | 'tempFiles';
}

const connection = { url: REDIS_URL };

export const cleanupWorker = new Worker<CleanupJobData>(
  'cleanup-queue',
  async (job) => {
    const { tenantId, type } = job.data;
    logger.info(`[CleanupJob] Running cleanup for ${type} (Tenant: ${tenantId})`);

    switch (type) {
      case 'notifications':
        await NotificationModel.deleteMany({
          tenantId,
          read: true,
          createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // older than 7 days
        });
        break;

      case 'tempFiles':
        // Add logic for temp file deletion
        break;

      default:
        throw new Error('Unknown cleanup type');
    }
  },
  { connection }
);

cleanupWorker.on('completed', (job) => {
  logger.info(`[CleanupJob] Completed: ${job.name}`);
});

cleanupWorker.on('failed', (job, err) => {
  logger.error(`[CleanupJob] Failed: ${err.message}`);
});
