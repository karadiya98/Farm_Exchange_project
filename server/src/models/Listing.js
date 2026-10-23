import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    catalogId: { type: Number, default: null, index: true },
    year: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    line: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    payment: { type: String, default: '', trim: true },
    hours: { type: String, default: '', trim: true },
    drive: { type: String, default: '', trim: true },
    horsepower: { type: String, default: '', trim: true },
    rops: { type: String, default: '', trim: true },
    load: { type: String, default: '', trim: true },
    serial: { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: '', trim: true },
    location: { type: String, default: '', trim: true },
    state: { type: String, default: '', trim: true },
    phone: { type: String, default: '(800) 224-8005', trim: true },
    seller: { type: String, default: 'Farm Exchange', trim: true },
    condition: { type: String, default: 'Used', trim: true },
    featured: { type: Boolean, default: false },
    special: { type: Boolean, default: false },
    photos: { type: [String], default: [] },
    source: { type: String, enum: ['catalog', 'admin'], default: 'admin' },
    updatedLabel: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);

listingSchema.index({ name: 'text', serial: 'text', type: 'text' });

export default mongoose.model('Listing', listingSchema);
