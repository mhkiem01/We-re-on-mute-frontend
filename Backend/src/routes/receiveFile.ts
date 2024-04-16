import express, { Request, Response } from 'express';
import { addReceivedFile, addNotification, getUserByEmail } from '../datastore';
import { validateReceiveFileRequest } from '../middleware/validateRequest';

const router = express.Router();

router.post('/', validateReceiveFileRequest, (req: Request, res: Response) => {
    const { name, format, content, recipient, message } = req.body;

    if (!name || !format || !content || !recipient || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const recipientUser = getUserByEmail(recipient);

    if (!recipientUser) {
        return res.status(404).json({ message: 'Recipient not found' });
    }

    const fileId = addReceivedFile(name, format, content, recipient);
    addNotification(fileId, message);

    res.status(200).json({ message: 'File received internally and notification added successfully', fileId });
});

export default router;
