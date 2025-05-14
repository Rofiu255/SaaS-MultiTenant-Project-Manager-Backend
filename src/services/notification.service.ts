import { sendEmail } from '../utils/email';
import { NotificationModel } from '../models/notification.model';

export const sendNotificationService = async (data: { type: string, message: string, userId: string, tenantId: string }) => {
  const { type, message, userId, tenantId } = data;

  // Save in DB
  const notification = await NotificationModel(tenantId).create({ type, message, user: userId });

  // Optionally send email
  if (type === 'EMAIL') {
    const userEmail = 'user@email.com'; // fetch from UserModel
    await sendEmail(userEmail, 'Notification', message);
  }

  return notification;
};

export const getNotificationsService = async (userId: string, tenantId: string) => {
  return await NotificationModel(tenantId).find({ user: userId });
};
