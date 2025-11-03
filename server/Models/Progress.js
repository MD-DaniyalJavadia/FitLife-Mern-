const ProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  weight: Number,
  bodyFat: Number,
  measurements: { chest: Number, waist: Number, hips: Number },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
