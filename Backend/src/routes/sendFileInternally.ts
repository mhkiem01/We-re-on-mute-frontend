import express, { Request, Response } from 'express';
import multer from 'multer';
import { addFile, addNotification } from '../datastore';
import { validateFileRequest } from '../middleware/validateRequest';

const router = express.Router();

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be saved in 'uploads/' directory

router.post('/', upload.single('file'), validateFileRequest, (req: Request, res: Response) => {
  const { to, subject, body } = req.body;
  const file = req.file; // File is provided by multer

  if (!file) {
    return res.status(400).json({ message: 'File upload failed' });
  }

  // Assuming `addFile` now takes a path instead of content
  const fileId = addFile(file.originalname, file.mimetype, file.path); // Assuming `name` and `format` are obtained from file object

  // Add notification
  addNotification(fileId, body); // Assuming `message` is the email body

  res.status(200).json({ message: 'File sent internally and notification added successfully' });
});

export default router;
