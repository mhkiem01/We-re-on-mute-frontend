import express, { Request, Response } from 'express';
import { getReceivedFiles } from '../datastore';
import { validateReceiveFileRequest } from '../middleware/validateRequest';

const router = express.Router();

router.post('/', validateReceiveFileRequest, (req: Request, res: Response) => {
  const { recipientEmail } = req.body;

  // Retrieve received files for the recipient
  const receivedFiles = getReceivedFiles(recipientEmail);

  // Sort received files by timestamp in descending order (most recent first)
  receivedFiles.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Send the sorted list of received files in the response
  res.status(200).json({ receivedFiles });
});

export default router;