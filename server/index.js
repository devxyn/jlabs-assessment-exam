import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config.js';
import { authRoutes } from './src/routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;

try {
  await mongoose.connect('mongodb://localhost:27017', {
    dbName: 'JLabs-Exam',
  });
  console.log('Connected to the database!');
} catch (error) {
  console.error('Database connection error!', error.message);
}

app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
