import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoute from './Routes/user.js';
import helmet from 'helmet';
import nutritionRoute from './Routes/Nutrition.js';
import workoutRoute from './Routes/workout.js'
import rateLimit from 'express-rate-limit';
import authRoute from './Routes/auth.js';

dotenv.config();

const app = express();

app.use(helmet()); // security headers
app.use(express.json());
app.use(cookieParser());

// CORS configuration (update allowed origin)
app.use(
  cors({
    origin: ['http://localhost:5173'], // React (Vite) default port
    credentials: true, // allow cookies
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limit each IP
});
app.use(limiter);

mongoose
  .connect(process.env.MongoDb_Connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({ msg: 'As-salamu alaykum' });
});

// Auth routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/workouts', workoutRoute);
app.use('/api/nutrition', nutritionRoute);



app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
