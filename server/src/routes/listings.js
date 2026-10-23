import { Router } from 'express';
import multer from 'multer';
import Listing from '../models/Listing.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2.5 * 1024 * 1024, files: 3 },
  fileFilter: (_req, file, cb) => {
    if (!/^image\/(jpeg|jpg|png|webp|gif)$/i.test(file.mimetype)) {
      return cb(new Error('Use JPG, PNG, or WebP photos.'));
    }
    cb(null, true);
  },
});

function filesToDataUrls(files = []) {
  return files.slice(0, 3).map((file) => {
    const mime = file.mimetype || 'image/jpeg';
    return `data:${mime};base64,${file.buffer.toString('base64')}`;
  });
}

function publicListing(doc) {
  const row = doc.toObject ? doc.toObject() : doc;
  return {
    id: row._id.toString(),
    catalogId: row.catalogId,
    year: row.year,
    name: row.name,
    type: row.type,
    line: row.line,
    price: row.price,
    payment: row.payment,
    hours: row.hours,
    drive: row.drive,
    horsepower: row.horsepower,
    rops: row.rops,
    load: row.load,
    serial: row.serial,
    description: row.description,
    location: row.location,
    state: row.state,
    phone: row.phone,
    seller: row.seller,
    condition: row.condition || (row.hours === 'New' ? 'New' : 'Used'),
    featured: !!row.featured,
    special: !!row.special,
    photos: Array.isArray(row.photos) ? row.photos.slice(0, 3) : [],
    source: row.source || 'admin',
    updated: row.updatedLabel || (row.updatedAt ? new Date(row.updatedAt).toLocaleString() : ''),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function boolFrom(value) {
  return value === true || value === 'true' || value === '1' || value === 'on';
}

router.get('/', async (_req, res, next) => {
  try {
    const rows = await Listing.find().sort({ createdAt: -1 }).lean();
    res.json({ listings: rows.map(publicListing) });
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAdmin, upload.array('photos', 3), async (req, res, next) => {
  try {
    const body = req.body || {};
    const year = String(body.year || '').trim();
    const name = String(body.name || '').trim();
    const type = String(body.type || '').trim();
    const line = String(body.line || '').trim();
    const price = String(body.price || '').trim();
    const serial = String(body.serial || '').trim();

    if (!year || !name || !type || !line || !price || !serial) {
      return res.status(400).json({ message: 'Year, name, type, line, price, and serial are required.' });
    }

    const existing = await Listing.findOne({ serial });
    if (existing) return res.status(409).json({ message: 'That serial is already on the lot.' });

    const hours = String(body.hours || '').trim();
    const listing = await Listing.create({
      year,
      name,
      type,
      line,
      price,
      payment: String(body.payment || '').trim(),
      hours,
      drive: String(body.drive || '').trim(),
      horsepower: String(body.horsepower || '').trim(),
      rops: String(body.rops || '').trim(),
      load: String(body.load || '').trim(),
      serial,
      description: String(body.description || '').trim(),
      location: String(body.location || '').trim(),
      state: String(body.state || '').trim(),
      phone: String(body.phone || '(800) 224-8005').trim(),
      seller: String(body.seller || 'Farm Exchange').trim(),
      condition: hours === 'New' ? 'New' : 'Used',
      featured: boolFrom(body.featured),
      special: boolFrom(body.special),
      photos: filesToDataUrls(req.files),
      source: 'admin',
      updatedLabel: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    res.status(201).json({ listing: publicListing(listing) });
  } catch (error) {
    next(error);
  }
});

router.post('/seed', requireAdmin, async (req, res, next) => {
  try {
    const items = Array.isArray(req.body?.listings) ? req.body.listings : [];
    if (!items.length) return res.status(400).json({ message: 'No catalog listings to import.' });

    let upserted = 0;
    for (const raw of items) {
      const serial = String(raw.serial || '').trim();
      if (!serial) continue;
      const photos = Array.isArray(raw.photos)
        ? raw.photos.filter(Boolean).slice(0, 3).map(String)
        : [];
      const hours = String(raw.hours || '').trim();
      await Listing.findOneAndUpdate(
        { serial },
        {
          $set: {
            catalogId: Number(raw.id) || null,
            year: String(raw.year || '').trim(),
            name: String(raw.name || '').trim(),
            type: String(raw.type || '').trim(),
            line: String(raw.line || '').trim(),
            price: String(raw.price || '').trim(),
            payment: String(raw.payment || '').trim(),
            hours,
            drive: String(raw.drive || '').trim(),
            horsepower: String(raw.horsepower || '').trim(),
            rops: String(raw.rops || '').trim(),
            load: String(raw.load || '').trim(),
            description: String(raw.description || '').trim(),
            location: String(raw.location || '').trim(),
            state: String(raw.state || '').trim(),
            phone: String(raw.phone || '(800) 224-8005').trim(),
            seller: String(raw.seller || 'Farm Exchange').trim(),
            condition: hours === 'New' ? 'New' : 'Used',
            featured: !!raw.featured,
            special: !!raw.special,
            photos,
            source: 'catalog',
            updatedLabel: String(raw.updated || '').trim(),
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
      upserted += 1;
    }

    const listings = await Listing.find().sort({ createdAt: -1 }).lean();
    res.json({ ok: true, upserted, listings: listings.map(publicListing) });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const row = await Listing.findById(req.params.id).lean();
    if (!row) return res.status(404).json({ message: 'Listing not found.' });
    res.json({ listing: publicListing(row) });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', requireAdmin, upload.array('photos', 3), async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });

    const body = req.body || {};
    const fields = [
      'year', 'name', 'type', 'line', 'price', 'payment', 'hours', 'drive',
      'horsepower', 'rops', 'load', 'serial', 'description', 'location', 'state', 'phone', 'seller',
    ];
    fields.forEach((key) => {
      if (body[key] !== undefined) listing[key] = String(body[key]).trim();
    });
    if (body.featured !== undefined) listing.featured = boolFrom(body.featured);
    if (body.special !== undefined) listing.special = boolFrom(body.special);
    listing.condition = listing.hours === 'New' ? 'New' : 'Used';

    const uploaded = filesToDataUrls(req.files);
    if (uploaded.length) {
      listing.photos = uploaded.slice(0, 3);
    }

    listing.updatedLabel = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    await listing.save();
    res.json({ listing: publicListing(listing) });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

export default router;
