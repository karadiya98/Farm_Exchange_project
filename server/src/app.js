import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import accountRoutes from './routes/account.js';
import adsRoutes from './routes/ads.js';
import listingsRoutes from './routes/listings.js';
import { allowedOrigins, isOriginAllowed } from './corsOrigins.js';
import { connectDb } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set('trust proxy', 1);

function applyCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
}

app.use((req, res, next) => {
  applyCorsHeaders(req, res);
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.use(
  cors({
    origin(origin, callback) {
      if (isOriginAllowed(origin)) {
        callback(null, origin || true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  })
);

app.use(async (_req, _res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(express.json({ limit: '8mb' }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    origins: allowedOrigins(),
    time: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/listings', listingsRoutes);

app.use((error, req, res, next) => {
  applyCorsHeaders(req, res);
  if (res.headersSent) return next(error);
  const isMulter = error?.name === 'MulterError';
  const status = isMulter
    ? 400
    : Number(error.status || error.statusCode) || 500;
  if (status >= 500) console.error(error);
  const multerMessage =
    error?.code === 'LIMIT_FILE_SIZE'
      ? 'Each photo must be under 2.5 MB.'
      : error?.code === 'LIMIT_FILE_COUNT'
        ? 'Use up to 3 photos.'
        : error.message;
  res.status(status).json({
    message: isMulter
      ? multerMessage || 'Photo upload failed.'
      : status >= 500
        ? 'The desk could not finish that request.'
        : (error.message || 'The desk could not finish that request.'),
  });
});

export default app;
