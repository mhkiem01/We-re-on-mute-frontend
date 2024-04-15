import express, { Request, Response } from 'express';
import { addReceivedFile, addNotification, getUserByEmail } from '../datastore';
import { validateFileRequest } from '../middleware/validateRequest';

const router = express.Router();

router.post('/', validateFileRequest, (req: Request, res: Response) => {
    const { name, format, path, recipient, message } = req.body;

    if (!name || !format || !path || !recipient || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const recipientUser = getUserByEmail(recipient);

    if (!recipientUser) {
        return res.status(404).json({ message: 'Recipient not found' });
    }

    const fileId = addReceivedFile(name, path, recipient);
    addNotification(fileId, recipient, message);

    res.status(200).json({ message: 'File received internally and notification added successfully', fileId });
});

export default router;
