// routes/updatePassword.ts
import express, { Request, Response } from 'express';
import { getUserByEmail, updateUserPassword } from '../datastore';

const router = express.Router();

router.put('/', (req: Request, res: Response) => {
  const { email, currentPassword, newPassword } = req.body;

  // Check if all required fields are provided
  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Email, currentPassword, and newPassword are required' });
  }

  // Check if the user exists
  const user = getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  // Check if the current password matches the user's password
  if (user.password !== currentPassword) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  // Update user's password in the datastore
  updateUserPassword(email, newPassword);

  // Respond with success message
  res.status(200).json({ message: 'Password updated successfully' });
});

export default router;
