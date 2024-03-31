// routes/receiveFile.ts
import express, { Request, Response } from 'express';
import { addFile, addNotification } from '../datastore';
import { validateFileRequest } from '../middleware/validateRequest';
const router = express.Router();

router.post('/', validateFileRequest, (req: Request, res: Response) => {
  const { name, format, content, message } = req.body;

  // Add file to datastore
  const fileId = addFile(name, format, content);

  // Add notification
  addNotification(fileId, message);

  res.status(200).json({ message: 'File received internally and notification added successfully' });
});

export default router;
