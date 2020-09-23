import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateDataSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const schemaSignIn = Joi.object({
    email: Joi.string().email().min(3).max(45).required(),
    password: Joi.string().min(8).max(30).required(),
  });
  try {
    const { email, password } = req.body;
    const value = await schemaSignIn.validateAsync({ email, password });
  } catch (err) {
    const errMessage: string = err.message.replace(/"/g, '');
    return res.status(400).json({ message: errMessage });
  }
  next();
};
export const validateDataUser = async (req: Request, res: Response, next: NextFunction) => {
  const schemaSignIn = Joi.object({
    username: Joi.string().alphanum().min(3).max(15).required(),
    email: Joi.string().email().min(3).max(45).required(),
    password: Joi.string().min(8).max(30).required(),
    role: Joi.string(),
  });
  try {
    const { username, email, password, role } = req.body;
    const value = await schemaSignIn.validateAsync({ username, email, password, role });
  } catch (err) {
    const errMessage: string = err.message.replace(/"/g, '');
    return res.status(400).json({ message: errMessage });
  }
  next();
};
