import mongoose, { Schema, model } from 'mongoose';

const tenantSchema = new Schema({
  name: { type: String, required: true, unique: true },
  ownerEmail: { type: String, required: true },
  plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const TenantModel = model('Tenant', tenantSchema);
