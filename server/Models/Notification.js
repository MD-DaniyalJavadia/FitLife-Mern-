const NotificationSchema = new Schema({
  title: String,
  message: String,
  type: { type: String, default: 'info' }, // push, email, in-app
  target: { type: String, enum: ['all', 'user', 'segment'], default: 'all' },
  targetUserIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['pending','sent','failed'], default: 'pending' },
  scheduledAt: Date,
  sentAt: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Date, default: Date.now }
});
