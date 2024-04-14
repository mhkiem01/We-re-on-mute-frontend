// routes/notifications.ts
import express, { Request, Response } from 'express';
import { getNotifications, markNotificationAsViewed } from '../datastore';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const recipientEmail = req.user.email; // Assuming you have authentication middleware
  const notifications = getNotifications(recipientEmail);
  res.status(200).json(notifications);
});

router.post('/:notificationId/markAsViewed', (req: Request, res: Response) => {
  const recipientEmail = req.user.email; // Assuming you have authentication middleware
  const notificationId = req.params.notificationId;

  const markedAsViewed = markNotificationAsViewed(notificationId, recipientEmail);

  if (markedAsViewed) {
    res.status(200).json({ message: 'Notification marked as viewed successfully' });
  } else {
    res.status(404).json({ message: 'Notification not found or not owned by the user' });
  }
});

export default router;
