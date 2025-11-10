import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import workoutRoute from './Routes/workout.js';
import nutritionRoute from './Routes/Nutrition.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS configuration
app.use(
  cors({
    origin: ['http://localhost:5173'], // React frontend
    credentials: true,
  })
);

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
});
app.use(limiter);

// MongoDB connection
mongoose
  .connect(process.env.MongoDb_Connection)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.json({ msg: 'As-salamu alaykum' });
});

// API routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/workouts', workoutRoute);
app.use('/api/nutrition', nutritionRoute);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
