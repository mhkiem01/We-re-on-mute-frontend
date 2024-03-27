// routes/sendFileInternally.ts
import express, { Request, Response } from 'express';
import { addFile, addNotification } from '../datastore';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { name, format, content, message } = req.body;

  // Check if all required fields are provided
  if (!name || !format || !content || !message) {
    return res.status(400).json({ message: 'Name, format, content, and message are required' });
  }

  // Add file to datastore
  const fileId = addFile(name, format, content);

  // Add notification
  addNotification(fileId, message);

  res.status(200).json({ message: 'File sent internally and notification added successfully' });
});

export default router;
