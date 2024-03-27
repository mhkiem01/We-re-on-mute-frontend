// routes/checkInternalReceiving.ts
import express, { Request, Response } from 'express';
import { checkInternalSending } from '../datastore';

const router = express.Router();

router.get('/:fileId', (req: Request, res: Response) => {
  const fileId = req.params.fileId;

  // Check if the invoice is received internally correctly
  const isReceivedCorrectly = checkInternalSending(fileId);

  if (isReceivedCorrectly) {
    res.status(200).json({ message: 'File is received internally correctly' });
  } else {
    res.status(400).json({ message: 'File is not received internally correctly' });
  }
});

export default router;
