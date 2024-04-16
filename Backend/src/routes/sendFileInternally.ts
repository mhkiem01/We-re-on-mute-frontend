import express, { Request, Response } from 'express';
import multer from 'multer';
import { data, setData, File, Notification, generateId } from '../datastore';
import { validateFileRequest } from '../middleware/validateRequest';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), validateFileRequest, (req: Request, res: Response) => {
  // Extract necessary information from the request
  const { name, format, path, senderEmail, recipientEmail } = req.body;
  const fileId = generateId();
  const timestamp = new Date(); // Current timestamp
  const file: File = { id: fileId, name, format, path, sender: senderEmail, recipient: recipientEmail, timestamp };

  // Add the file to the datastore
  data.files.push(file);

  // Update sender's sentFiles array
  if (data.users[senderEmail]) {
    data.users[senderEmail].sentFiles.push(fileId);
  }

  // Update recipient's receivedFiles array
  if (data.users[recipientEmail]) {
    data.users[recipientEmail].receivedFiles.push(fileId);
  }

  // Add notification for recipient
  const senderName = data.users[senderEmail]?.name || 'Unknown Sender';
  const message = `You received a file (${name}.${format}) from ${senderName}`;
  const notification: Notification = { fileId, recipient: recipientEmail, message };
  data.notifications.push(notification);

  // Update the datastore
  setData(data);

  // Respond with success message
  res.status(200).json({ message: 'File sent successfully', fileId });
});

export default router;
