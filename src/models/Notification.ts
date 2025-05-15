import { Schema, model, Model, Document } from 'mongoose';

export interface INotification extends Document {
  tenantId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  tenantId: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const NotificationModel = model<INotification>('Notification', notificationSchema);
export default NotificationModel;
