import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config.js';

import { authRoutes } from './src/routes/authRoutes.js';

const app = express();
const PORT = 8000 || process.env.PORT;

app.use('/api', authRoutes);

app.listen(() => console.log(`Server is running in port ${PORT}`));
