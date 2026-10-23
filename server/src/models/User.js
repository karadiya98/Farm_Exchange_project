import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema(
  {
    phone: { type: String, default: '', trim: true },
    farm: { type: String, default: '', trim: true },
    state: { type: String, default: '', trim: true },
    city: { type: String, default: '', trim: true },
    gate: { type: String, default: 'Liftgate OK', trim: true },
    notes: { type: String, default: '', trim: true },
  },
  { _id: false }
);

const settingsSchema = new mongoose.Schema(
  {
    emailOrders: { type: Boolean, default: true },
    emailSpecials: { type: Boolean, default: true },
    emailWatch: { type: Boolean, default: true },
    smsFreight: { type: Boolean, default: false },
    phoneOk: { type: Boolean, default: true },
    marketing: { type: Boolean, default: false },
    defaultLine: { type: String, default: 'all' },
    defaultState: { type: String, default: '' },
    freightPref: { type: String, default: 'Ask each time' },
    largeType: { type: Boolean, default: false },
    reduceMotion: { type: Boolean, default: false },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    refreshTokenHash: { type: String, default: '' },
    farm: { type: farmSchema, default: () => ({}) },
    settings: { type: settingsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
