import { Schema, model, Model, Types } from 'mongoose';
import { getTenantDb } from '../config/db';

export interface IProject {
  name: string;
  description?: string;
  owner?: Types.ObjectId;
  members?: Types.ObjectId[];
  status: 'active' | 'completed' | 'archived';
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: {
      type: String,
      enum: ['active', 'completed', 'archived'],
      default: 'active',
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

export const ProjectModel = (tenantId: string): Model<IProject> => {
  const db = getTenantDb(tenantId);
  return db.models.Project || db.model<IProject>('Project', projectSchema);
};
