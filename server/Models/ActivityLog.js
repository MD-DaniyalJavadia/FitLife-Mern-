const ActivityLogSchema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: 'Admin' },
  action: String, // created workout, deleted user, etc.
  entityType: String, // User, Workout, Nutrition...
  entityId: Schema.Types.ObjectId,
  details: Schema.Types.Mixed,
  ip: String,
  createdAt: { type: Date, default: Date.now }
});
