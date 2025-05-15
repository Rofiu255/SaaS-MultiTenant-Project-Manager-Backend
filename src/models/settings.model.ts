// 1. Import dependencies
import mongoose, { Schema, Document, model } from 'mongoose';
import { ISettings } from '../interfaces/ISettings';

// 2. Create a type that extends both ISettings and Mongoose Document
export interface ISettingsDocument extends ISettings, Document {}

// 3. Define schema
const settingsSchema = new Schema<ISettingsDocument>(
  {
    tenantId: { type: String, required: true, index: true, unique: true },
    theme: { type: String, default: 'light' },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
    },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' },
  },
  { timestamps: true }
);

// 4. Export the model
export const SettingsModel = model<ISettingsDocument>('Settings', settingsSchema);
