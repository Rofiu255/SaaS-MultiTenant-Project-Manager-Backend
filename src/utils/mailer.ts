import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '../config/env';
import { logger } from './logger';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"SaaS Platform" <${SMTP_USER}>`,
      to,
      subject,
      html,
    });

    logger.info(` Email sent: ${info.messageId}`);
  } catch (error) {
    logger.error(' Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
