import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import AdSubmission from '../models/AdSubmission.js';

const router = Router();

router.get('/access', requireAuth, (req, res) => {
  res.json({ ok: true });
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const businessName = String(req.body?.name || req.body?.businessName || '').trim();
    const contactEmail = String(req.body?.email || req.body?.contactEmail || req.user.email || '')
      .trim()
      .toLowerCase();
    const link = String(req.body?.link || '').trim();
    const side = ['left', 'right', 'both'].includes(req.body?.side) ? req.body.side : 'both';
    const notes = String(req.body?.notes || '').trim().slice(0, 2000);
    const fileNames = Array.isArray(req.body?.fileNames)
      ? req.body.fileNames.map((name) => String(name || '').trim()).filter(Boolean).slice(0, 3)
      : [];

    if (businessName.length < 2) {
      return res.status(400).json({ message: 'Add the business name for the ad.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      return res.status(400).json({ message: 'Use an email the desk can answer.' });
    }

    const ad = await AdSubmission.create({
      user: req.user._id,
      businessName,
      contactEmail,
      link,
      side,
      notes,
      fileNames,
    });

    res.status(201).json({
      ok: true,
      ad: {
        id: ad._id.toString(),
        businessName: ad.businessName,
        side: ad.side,
        status: ad.status,
        fileNames: ad.fileNames,
        createdAt: ad.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/mine', requireAuth, async (req, res, next) => {
  try {
    const ads = await AdSubmission.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20).lean();
    res.json({
      ads: ads.map((ad) => ({
        id: ad._id.toString(),
        businessName: ad.businessName,
        side: ad.side,
        status: ad.status,
        fileNames: ad.fileNames,
        createdAt: ad.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
