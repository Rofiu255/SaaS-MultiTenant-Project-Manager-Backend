import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  REDIS_URL: z.string().min(1, 'REDIS_URL is required'),

  JWT_SECRET: z.string().min(10, 'JWT_SECRET must be at least 10 characters'),
  CORS_ORIGIN: z.string().url('CORS_ORIGIN must be a valid URL'),

  SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
  SMTP_PORT: z.coerce.number().int().default(587),
  SMTP_USER: z.string().min(1, 'SMTP_USER is required'),
  SMTP_PASS: z.string().min(1, 'SMTP_PASS is required'),

  // AWS S3
  AWS_ACCESS_KEY_ID: z.string().min(1, 'AWS_ACCESS_KEY_ID is required'),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, 'AWS_SECRET_ACCESS_KEY is required'),
  AWS_REGION: z.string().min(1, 'AWS_REGION is required'),
  AWS_S3_BUCKET: z.string().min(1, 'AWS_S3_BUCKET is required'),

  // Cloudinary
  CLOUDINARY_NAME: z.string().min(1, 'CLOUDINARY_NAME is required'),
  CLOUDINARY_KEY: z.string().min(1, 'CLOUDINARY_KEY is required'),
  CLOUDINARY_SECRET: z.string().min(1, 'CLOUDINARY_SECRET is required'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

const env = parsed.data;

// Named exports (for direct destructuring in small files)
export const PORT = parseInt(env.PORT, 10);
export const NODE_ENV = env.NODE_ENV;
export const MONGO_URI = env.MONGO_URI;
export const REDIS_URL = env.REDIS_URL;
export const JWT_SECRET: string = env.JWT_SECRET;
export const CORS_ORIGIN = env.CORS_ORIGIN;

export const SMTP_HOST = env.SMTP_HOST;
export const SMTP_PORT = env.SMTP_PORT;
export const SMTP_USER = env.SMTP_USER;
export const SMTP_PASS = env.SMTP_PASS;

// Unified config object (for centralized import)
export const config = {
  PORT,
  NODE_ENV,

  MONGO_URI,
  REDIS_URL,
  JWT_SECRET,
  CORS_ORIGIN,

  SMTP: {
    host: SMTP_HOST,
    port: SMTP_PORT,
    user: SMTP_USER,
    pass: SMTP_PASS,
  },

  AWS: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION,
    bucket: env.AWS_S3_BUCKET,
  },

  CLOUDINARY: {
    name: env.CLOUDINARY_NAME,
    key: env.CLOUDINARY_KEY,
    secret: env.CLOUDINARY_SECRET,
  },
};
