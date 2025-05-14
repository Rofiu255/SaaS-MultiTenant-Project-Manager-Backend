import mongoose from 'mongoose';
import { MONGO_URI } from './env';
import { logger } from '../utils/logger';

export const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI is not defined in environment variables');

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      dbName: 'saas-platform', // base DB for shared data
    });

    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const connections: Record<string, mongoose.Connection> = {};

export const getTenantDb = (tenantId: string): mongoose.Connection => {
    if (connections[tenantId]) return connections[tenantId];
  
    if (!MONGO_URI) throw new Error('MONGO_URI is not defined');
  
    const db = mongoose.createConnection(MONGO_URI, {
      dbName: `tenant__${tenantId}`,
      // useNewUrlParser and useUnifiedTopology are no longer needed in Mongoose v6+
    });
  
    db.on('connected', () => logger.info(`Tenant DB connected: tenant__${tenantId}`));
    db.on('error', (err) => logger.error(`Tenant DB error (${tenantId}):`, err));
  
    connections[tenantId] = db;
    return db;
  };
  