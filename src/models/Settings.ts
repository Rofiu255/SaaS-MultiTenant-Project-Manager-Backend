import { Schema, model, Model } from 'mongoose';
import { getTenantDb } from '../config/db';

export interface ISettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  timezone: string;
  createdAt: Date;
}

const settingsSchema = new Schema<ISettings>({
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  notifications: { type: Boolean, default: true },
  timezone: { type: String, default: 'UTC' },
  createdAt: { type: Date, default: Date.now },
});

export const SettingsModel = (tenantId: string): Model<ISettings> => {
  const db = getTenantDb(tenantId);
  return db.models.Settings || db.model<ISettings>('Settings', settingsSchema);
};
