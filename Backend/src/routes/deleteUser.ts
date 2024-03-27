// routes/deleteUser.ts
import express, { Request, Response } from 'express';
import { deleteUserByEmail, getUserByEmail } from '../datastore';

const router = express.Router();

router.delete('/', async (req: Request, res: Response) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Delete User
  deleteUserByEmail(email);

  res.status(200).json({ message: 'User deleted successfully' });
});

export default router;
