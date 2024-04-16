// routes/notifications.ts
import express, { Request, Response } from 'express';
import { getNotificationsForUser } from '../datastore';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const userEmail = req.query.userEmail as string; // Assuming userEmail is provided as a query parameter
  const notifications = getNotificationsForUser(userEmail);

  res.status(200).json({ notifications });
});

export default router;
