import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotification extends Document {
  message: string;
  read: boolean;
  createdAt: Date;
  user: mongoose.Types.ObjectId;
}

const notificationSchema = new Schema<INotification>({
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

/**
 * Returns the Notification model for a specific tenant.
 * This uses the tenant's DB via mongoose.connection.useDb(tenantId)
 */
export const NotificationModel = (tenantId: string): Model<INotification> => {
  const db = mongoose.connection.useDb(tenantId, { useCache: true });
  // Avoid re-registering the model
  if (db.models.Notification) {
    return db.models.Notification as Model<INotification>;
  }
  return db.model<INotification>('Notification', notificationSchema);
};
