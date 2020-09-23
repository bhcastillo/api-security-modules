import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const schemaProduct = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    category: Joi.string().min(3).max(30).required(),
    price: Joi.number().min(3).required(),
  });
  try {
    const { name, category, price } = req.body;
    const value = await schemaProduct.validateAsync({ name, category, price });
  } catch (err) {
    const errMessage: string = err.message.replace(/"/g, '');
    return res.status(400).json({ message: errMessage });
  }
  next();
};
