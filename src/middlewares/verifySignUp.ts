import { Request, Response, NextFunction } from 'express';

import User from '../models/User';

export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Getting the Request Body
    const { username, email } = req.body;
    const userDB = await User.findOne({ username });

    if (userDB) return res.status(400).json({ message: 'The Username already exists' });

    const emailDB = await User.findOne({ email });

    if (emailDB) return res.status(400).json({ message: 'The Email already exists' });

    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
