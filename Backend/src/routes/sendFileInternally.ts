import express, { Request, Response } from 'express';
import multer from 'multer';
import { addFile, addNotification } from '../datastore';
import { validateFileRequest } from '../middleware/validateRequest';

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); 

router.post('/', upload.single('selectedFile'), validateFileRequest, (req: Request, res: Response) => {
  const { to, subject, body, file } = req.body;
  if (!file) {
    return res.status(400).json({ message: 'File upload failed' });
  }
  console.log(file);
  // const fileId = addFile(file.)
  // const fileId = addFile(file.originalname, file.mimetype, file.path); 

  // addNotification(fileId, body); 

  res.status(200).json({ message: 'File sent internally and notification added successfully' });
});

export default router;