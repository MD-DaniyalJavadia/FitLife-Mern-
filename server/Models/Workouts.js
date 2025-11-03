import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'other'],
    default: 'other'
  },
  exercises: [
    {
      exerciseName: String,
      sets: Number,
      reps: Number,
      weight: Number,
      notes: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
