import User from '../models/User.js';
import { verifyAccess } from '../tokens.js';

export async function requireAuth(req, res, next) {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json({ message: 'Sign in to continue.' });

  try {
    const payload = verifyAccess(token);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Sign in to continue.' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Sign in to continue.' });
  }
}
