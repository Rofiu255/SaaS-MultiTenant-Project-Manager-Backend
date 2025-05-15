import { Worker } from 'bullmq';
import { sendEmail } from '../utils/mailer';
import { REDIS_URL } from '../config/env';
import { logger } from '../utils/logger';

interface EmailJobData {
  to: string;
  subject: string;
  html: string;
  tenantId?: string;
}

const connection = { url: REDIS_URL };

export const emailWorker = new Worker<EmailJobData>(
  'email-queue',
  async (job) => {
    try {
      logger.info(`[EmailJob] Sending email to ${job.data.to}`);
      await sendEmail(job.data);
    } catch (error) {
      logger.error(`[EmailJob] Failed: ${error}`);
      throw error;
    }
  },
  { connection }
);

emailWorker.on('completed', (job) => {
  logger.info(`[EmailJob] Completed for ${job.data.to}`);
});

emailWorker.on('failed', (job, err) => {
  logger.error(`[EmailJob] Failed for ${job?.data?.to}: ${err.message}`);
});
