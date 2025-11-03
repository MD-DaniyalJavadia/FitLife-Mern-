const SettingsSchema = new Schema({
  key: { type: String, unique: true },
  value: Schema.Types.Mixed,
  description: String,
  updatedAt: Date
});
