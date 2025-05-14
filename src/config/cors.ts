import cors, { CorsOptions } from 'cors';
import { CORS_ORIGIN } from './env';

const allowedOrigins = CORS_ORIGIN?.split(',') || ['http://localhost:3000'];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
