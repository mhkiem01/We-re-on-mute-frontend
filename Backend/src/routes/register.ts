// routes/register.ts
import express, { Request, Response } from 'express';
import { addUser, getUserByEmail } from '../datastore';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  // Registration logic
  const { Name, email, password } = req.body; // Changed variable name to Name

  // Check if Name, email, and password are provided // Changed variable name to Name
  if (!Name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' }); // Changed variable name to Name
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Check password length
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  // Check if user already exists
  if (getUserByEmail(email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  addUser(email, hashedPassword, Name); // Changed variable name to Name

  res.status(201).json({ message: 'User registered successfully' });
});

export default router;
