import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mealName: {
    type: String,
    required: true,
    trim: true
  },
  calories: {
    type: Number,
    required: true
  },
  protein: Number,
  carbs: Number,
  fats: Number,
  date: {
    type: Date,
    default: Date.now
  },
  notes: String
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);
export default Nutrition;
