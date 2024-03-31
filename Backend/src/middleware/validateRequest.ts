// middleware/validateRequest.ts
import { Request, Response, NextFunction } from 'express';

export const validateFileRequest = (req: Request, res: Response, next: NextFunction) => {
  const { name, format, content, message } = req.body;

  if (!name || !format || !content || !message) {
    return res.status(400).json({ message: 'Name, format, content, and message are required' });
  }

  next();
};
