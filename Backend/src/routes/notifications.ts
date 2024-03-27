// routes/notifications.ts
import express, { Request, Response } from 'express';
import { getNotifications } from '../datastore';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const notifications = getNotifications();
  res.status(200).json(notifications);
});

export default router;
