import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config.js';

const app = express();
const PORT = 8000 || process.env.PORT;

app.listen(() => console.log(`Server is running in port ${PORT}`));
