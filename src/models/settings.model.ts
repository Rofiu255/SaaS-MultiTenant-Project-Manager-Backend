import mongoose, { Schema, Document } from 'mongoose';
import { ISettings } from '../interfaces/ISettings';

const settingsSchema = new Schema<ISettings>(
  {
    tenantId: { type: String, required: true, index: true, unique: true },
    theme: { type: String, default: 'light' },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
    },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' }
  },
  { timestamps: true }
);

export const SettingsModel = mongoose.model<ISettings & Document>('Settings', settingsSchema);
