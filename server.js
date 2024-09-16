import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import connectDB from './config/db.js';

dotenv.config();

const app = express();
const port = 5002;
const __dirname = path.resolve(); // Directory path

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// CORS
app.use(cors());

// Import and use routes
import userRoutes from './routes/user.js';
app.use('/api/user', userRoutes);

app.get('/api/status', (req, res) => {
  res.send("CareerPilot backend running...");
});

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on --> http://localhost:${port} <--`);
});
