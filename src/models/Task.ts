import { Schema, model, Model } from 'mongoose';
import { getTenantDb } from '../config/db';

export interface ITask {
  title: string;
  description: string;
  project: Schema.Types.ObjectId;
  assignee: Schema.Types.ObjectId;
  status: 'todo' | 'in_progress' | 'done';
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  assignee: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' },
  dueDate: Date,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  createdAt: { type: Date, default: Date.now },
});

export const TaskModel = (tenantId: string): Model<ITask> => {
  const db = getTenantDb(tenantId);
  return db.models.Task || db.model<ITask>('Task', taskSchema);
};
