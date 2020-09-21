import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IPayload } from '../models/Payload';
import { IUser } from '../models/User';

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'No Token Provided' });
  jwt.verify(token, process.env.SECRET_TOKEN || 'secretToken', (err, payload: any) => {
    if (err) return res.status(401).json({ error: 'Invalid Token' });
    req.userId = payload._id;
    next();
  });
};
