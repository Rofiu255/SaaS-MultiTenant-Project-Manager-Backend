import { sendEmail } from '../utils/mailer';
import { NotificationModel } from '../models/Notification';

export const sendNotificationService = async (data: {
  type: string;
  message: string;
  userId: string;
  tenantId: string;
}) => {
  const { type, message, userId, tenantId } = data;

  // Save in DB
  const notification = await NotificationModel(tenantId).create({
    type,
    message,
    user: userId,
  });

  // Optionally send email
  if (type === 'EMAIL') {
    const userEmail = 'user@email.com'; // TODO: Replace with dynamic fetch from UserModel
    await sendEmail({
      to: userEmail,
      subject: 'Notification',
      html: `<p>${message}</p>`,
    });
  }

  return notification;
};
