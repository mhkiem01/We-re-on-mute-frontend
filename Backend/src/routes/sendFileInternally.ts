import express, { Request, Response } from 'express';
import multer from 'multer';
import { sendInvoiceInternally } from '../datastore';
import { validateFileRequest } from '../middleware/validateRequest';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), validateFileRequest, (req: Request, res: Response) => {
  const { to, subject, body } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'File upload failed' });
  }

  const invoiceId = sendInvoiceInternally(req.user.email, to, file.path);

  if (!invoiceId) {
    return res.status(500).json({ message: 'Failed to send invoice internally' });
  }

  res.status(200).json({ message: 'File sent internally and notification added successfully', invoiceId });
});

export default router;