// routes/register.ts
import express, { Request, Response } from 'express';
import { addUser, getUserByEmail } from '../datastore';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { Name, email, password } = req.body;

  if (!Name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  if (getUserByEmail(email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  addUser(email, hashedPassword, Name);

  res.status(201).json({ message: 'User registered successfully' });
});

export default router;
