import mongoose from 'mongoose';

const adSubmissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    businessName: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, trim: true, lowercase: true },
    link: { type: String, default: '', trim: true },
    side: { type: String, enum: ['left', 'right', 'both'], default: 'both' },
    notes: { type: String, default: '', trim: true },
    fileNames: [{ type: String, trim: true }],
    status: { type: String, enum: ['pending', 'reviewed', 'live', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model('AdSubmission', adSubmissionSchema);
