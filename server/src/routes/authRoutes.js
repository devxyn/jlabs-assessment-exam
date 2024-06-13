import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './../models/User.js';

const router = new Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secret');

    res.status(200).json({ message: 'Logged in successfully!', token, userID: user._id });
  } catch (error) {}
});

export { router as authRoutes };
