// middleware/validateRequest.ts
import { Request, Response, NextFunction } from 'express';

export const validateFileRequest = (req: Request, res: Response, next: NextFunction) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ message: 'to, subject, body, file are required' });
  }

  next();
};
