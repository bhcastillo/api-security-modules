import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  //saving a new user
  const user: IUser = new User({ username, email, password });
  user.password = await user.encryptPassword(user.password);
  const saveUser = await user.save();
  //token
  const token: string = jwt.sign({ _id: saveUser._id }, process.env.SECRET_TOKEN || 'secretToken');

  res.header('auth-token', token).json(saveUser);
};
export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'Email or password is wrong' });

  const correctPassword: boolean = await user.validatePassword(password);

  if (!correctPassword) return res.status(403).json({ message: 'Invalid Password' });
  const token: string = jwt.sign({ _id: user.id }, process.env.SECRET_TOKEN || 'secretToken', {
    expiresIn: 86400,
  });
  res.header('auth-token', token).json(user);
};
export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) return res.status(404).json({ message: 'No User Found' });
  res.json(user);
};
