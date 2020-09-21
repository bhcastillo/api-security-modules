import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';

export const signUp = async (req: Request, res: Response) => {
  //saving a new user
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  user.password = await user.encryptPassword(user.password);
  const saveUser = await user.save();
  //token
  const token: string = jwt.sign({ _id: saveUser._id }, process.env.SECRET_TOKEN || 'secretToken');

  res.header('auth-token', token).json(saveUser);
};
export const signIn = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: 'Email or password is wrong' });
  const correctPassword: boolean = await user.validatePassword(req.body.password);
  if (!correctPassword) return res.status(403).json({ message: 'Invalid Password' });
  const token: string = jwt.sign({ _id: user.id }, process.env.SECRET_TOKEN || 'secretToken', {
    expiresIn: 60 * 60 * 24,
  });
  res.header('auth-token', token).json(user);
};
export const profile = (req: Request, res: Response) => {
  res.json({ ok: 'true' });
};
