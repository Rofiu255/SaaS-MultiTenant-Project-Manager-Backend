import { Document, Types } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done'; // Enum status
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  assignedTo?: Types.ObjectId; // User ID
  project: Types.ObjectId; // Associated Project
  tenantId: string; // For multi-tenant tracking
  createdAt?: Date;
  updatedAt?: Date;
}
