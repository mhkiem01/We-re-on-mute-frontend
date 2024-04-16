// middleware/validateRequest.ts
import { Request, Response, NextFunction } from 'express';

export const validateFileRequest = (req: Request, res: Response, next: NextFunction) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ message: 'to, subject, body, file are required' });
  }

  next();
};

export const validateSendFileRequest = (req: Request, res: Response, next: NextFunction) => {
  const { name, format, path, senderEmail, recipientEmail } = req.body;

  if (!name || !format || !path || !senderEmail || !recipientEmail) {
    return res.status(400).json({ message: 'name, format, path, senderEmail and recipientEmail are required' });
  }

  next();
};

export const validateReceiveFileRequest = (req: Request, res: Response, next: NextFunction) => {
  const { name, format, content, recipient, message } = req.body;

  if (!name || !format || !content || !recipient || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  next();
};
