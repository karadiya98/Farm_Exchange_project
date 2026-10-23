import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { publicUser } from '../tokens.js';

const router = Router();

const defaultSettings = {
  emailOrders: true,
  emailSpecials: true,
  emailWatch: true,
  smsFreight: false,
  phoneOk: true,
  marketing: false,
  defaultLine: 'all',
  defaultState: '',
  freightPref: 'Ask each time',
  largeType: false,
  reduceMotion: false,
};

/** Soft gate: confirms the access cookie is valid for sensitive pages. */
router.get('/gate', requireAuth, (req, res) => {
  res.json({ ok: true, user: publicUser(req.user) });
});

const emptyFarm = {
  phone: '',
  farm: '',
  state: '',
  city: '',
  gate: 'Liftgate OK',
  notes: '',
};

router.get('/profile', requireAuth, (req, res) => {
  res.json({
    user: publicUser(req.user),
    farm: { ...emptyFarm, ...(req.user.farm?.toObject?.() || req.user.farm || {}) },
  });
});

router.patch('/profile', requireAuth, async (req, res, next) => {
  try {
    const farm = {
      phone: String(req.body?.phone || '').trim().slice(0, 40),
      farm: String(req.body?.farm || '').trim().slice(0, 120),
      state: String(req.body?.state || '').trim().slice(0, 40),
      city: String(req.body?.city || '').trim().slice(0, 80),
      gate: String(req.body?.gate || 'Liftgate OK').trim().slice(0, 80),
      notes: String(req.body?.notes || '').trim().slice(0, 800),
    };
    req.user.farm = farm;
    await req.user.save();
    res.json({ user: publicUser(req.user), farm });
  } catch (error) {
    next(error);
  }
});

router.get('/settings', requireAuth, (req, res) => {
  res.json({
    user: publicUser(req.user),
    settings: { ...defaultSettings, ...(req.user.settings?.toObject?.() || req.user.settings || {}) },
  });
});

router.patch('/settings', requireAuth, async (req, res, next) => {
  try {
    const incoming = req.body?.settings && typeof req.body.settings === 'object' ? req.body.settings : req.body;
    const nextSettings = {
      ...defaultSettings,
      ...(req.user.settings?.toObject?.() || req.user.settings || {}),
    };

    for (const key of Object.keys(defaultSettings)) {
      if (incoming[key] === undefined) continue;
      if (typeof defaultSettings[key] === 'boolean') nextSettings[key] = Boolean(incoming[key]);
      else nextSettings[key] = String(incoming[key] ?? '').trim().slice(0, 80);
    }

    req.user.settings = nextSettings;
    await req.user.save();
    res.json({ user: publicUser(req.user), settings: nextSettings });
  } catch (error) {
    next(error);
  }
});

/** Cart page access check — cart lines stay on the client for now. */
router.get('/cart', requireAuth, (req, res) => {
  res.json({ ok: true, user: publicUser(req.user) });
});

export default router;
