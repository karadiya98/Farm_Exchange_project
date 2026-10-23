import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { isAdminEmail, tryAdminLogin } from '../ensureAdmin.js';
import {
  clearAuthCookies,
  hashToken,
  publicUser,
  setAuthCookies,
  signAccess,
  signRefresh,
  verifyAccess,
  verifyRefresh,
} from '../tokens.js';

const router = Router();

async function issueSession(res, user) {
  const accessToken = signAccess(user);
  const refreshToken = signRefresh(user);
  // Avoid full document validation (nested farm/settings) crashing login/signup.
  await User.updateOne({ _id: user._id }, { refreshTokenHash: hashToken(refreshToken) });
  user.refreshTokenHash = hashToken(refreshToken);
  setAuthCookies(res, accessToken, refreshToken);
}

router.post('/signup', async (req, res, next) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    if (name.length < 2) return res.status(400).json({ message: 'Add the name the desk should use.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Use an email the desk can answer.' });
    }
    if (password.length < 8) return res.status(400).json({ message: 'Use at least 8 characters.' });

    if (isAdminEmail(email)) {
      return res.status(403).json({ message: 'That desk account signs in — it is not opened through signup.' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'That email already has an account.' });

    const user = await User.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: 'user',
    });
    await issueSession(res, user);
    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '').trim();

    // Desk admin: sync account on login so every environment / device gets the same pass.
    const adminUser = await tryAdminLogin(email, password);
    if (adminUser) {
      await issueSession(res, adminUser);
      return res.json({ user: publicUser(adminUser) });
    }

    const user = await User.findOne({ email });
    const matches = user && await bcrypt.compare(password, user.passwordHash);
    if (!matches) return res.status(401).json({ message: 'Those details do not match an account.' });

    await issueSession(res, user);
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.json({ user: null });

    let payload;
    try {
      payload = verifyRefresh(token);
    } catch {
      clearAuthCookies(res);
      return res.json({ user: null });
    }

    const user = await User.findById(payload.sub);
    if (!user || !user.refreshTokenHash || user.refreshTokenHash !== hashToken(token)) {
      clearAuthCookies(res);
      return res.json({ user: null });
    }

    await issueSession(res, user);
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      try {
        const payload = verifyRefresh(token);
        await User.updateOne({ _id: payload.sub, refreshTokenHash: hashToken(token) }, { refreshTokenHash: '' });
      } catch {
        // An expired refresh cookie still needs to be cleared.
      }
    }
    clearAuthCookies(res);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

router.get('/me', async (req, res) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.json({ user: null });

  try {
    const payload = verifyAccess(token);
    const user = await User.findById(payload.sub);
    if (!user) return res.json({ user: null, stale: true });
    res.json({ user: publicUser(user) });
  } catch {
    res.json({ user: null, stale: true });
  }
});

router.patch('/profile', requireAuth, async (req, res, next) => {
  try {
    const name = String(req.body?.name || '').trim();
    if (name.length < 2) return res.status(400).json({ message: 'Add the name the desk should use.' });
    req.user.name = name;
    await req.user.save();
    res.json({ user: publicUser(req.user) });
  } catch (error) {
    next(error);
  }
});

export default router;
