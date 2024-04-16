import express, { Request, Response } from 'express';
import multer from 'multer';
import * as datastore from '../datastore';
import { validateFileRequest } from '../middleware/validateRequest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../main';
import { addUser, clearData } from '../datastore';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), validateFileRequest, (req: Request, res: Response) => {
  // Extract necessary information from the request
  const { name, format, path, senderEmail, recipientEmail } = req.body;
  // Add the file to the datastore
    
    const fileId = generateId();
    const timestamp = new Date(); // Current timestamp
    const file: File = { id: fileId, name, format, path, sender: senderEmail, recipient: recipientEmail, timestamp };
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
    const message = `You received a file (${name}.${format}) from ${data.users[senderEmail].name}`;
    const notification: Notification = { fileId, recipient: recipientEmail, message };
    data.notifications.push(notification);
    setData(data);

    // Respond with success message
    res.status(200).json({ message: 'File sent successfully', fileId });
});

export default router;
