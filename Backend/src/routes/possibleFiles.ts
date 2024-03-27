// routes/possibleFiles.ts
import express, { Request, Response } from 'express';
import { getAllPossibleFiles } from '../datastore';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const possibleFiles = getAllPossibleFiles();
  res.status(200).json(possibleFiles);
});

export default router;
