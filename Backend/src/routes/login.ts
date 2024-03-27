// routes/login.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../datastore';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Check if user exists
  const user = getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Create and send JWT token
  const token = jwt.sign({ userId: email }, 'secret', { expiresIn: '1h' });

  res.status(200).json({ token, email });
});

export default router;
