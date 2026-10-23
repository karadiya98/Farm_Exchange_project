import mongoose from 'mongoose';
import { ensureAdminUser } from './ensureAdmin.js';

const globalCache = globalThis;

if (!globalCache.__farmMongo) {
  globalCache.__farmMongo = { conn: null, promise: null, admin: false };
}

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set.');
  }

  const cache = globalCache.__farmMongo;
  if (cache.conn && mongoose.connection.readyState === 1) {
    if (!cache.admin) {
      await ensureAdminUser();
      cache.admin = true;
    }
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    });
  }

  cache.conn = await cache.promise;
  if (!cache.admin) {
    await ensureAdminUser();
    cache.admin = true;
  }
  return cache.conn;
}
