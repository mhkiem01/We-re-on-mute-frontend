// routes/receiveFile.ts
import express, { Request, Response } from 'express';
import { receiveFileInternally } from '../datastore';
import { validateFileRequest } from '../middleware/validateRequest';

const router = express.Router();

router.post('/', validateFileRequest, (req: Request, res: Response) => {
  const { name, format, content, recipient, message } = req.body;

  if (!name || !format || !content || !recipient || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const fileId = receiveFileInternally(recipient, name, format, content);

  if (!fileId) {
    return res.status(500).json({ message: 'Failed to receive file internally' });
  }

  res.status(200).json({ message: 'File received internally and notification added successfully', fileId });
});

export default router;
