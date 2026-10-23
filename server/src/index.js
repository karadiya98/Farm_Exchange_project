import 'dotenv/config';
import app from './app.js';
import { connectDb } from './db.js';

const port = Number(process.env.PORT) || 5000;

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection', reason);
});

if (process.env.VERCEL) {
  // Vercel loads api/index.js instead of listening here.
} else {
  try {
    await connectDb();
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Auth server listening on ${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
}
