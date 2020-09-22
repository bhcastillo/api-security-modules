import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Role from '../models/Role';
import User, { IUser } from '../models/User';

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  //saving a new user
  const newUser: IUser = new User({ username, email, password });
  newUser.password = await newUser.encryptPassword(newUser.password);
  //Searching _id Role
  if (!role) {
    const roleUser = await Role.findOne({ name: 'User' });
    newUser.role = roleUser?._id;
  } else {
    //validation There can only be one Super Administrator
    if (role === 'Super Administrator') {
      res.status(401).json({ message: 'There can only be one Super Administrator' });
      return;
    }
    //searching Role
    const foundRole = await Role.findOne({ name: role });
    if (!foundRole) return res.status(400).json({ message: 'Role Not Found' });
    newUser.role = foundRole?._id;
  }
  //Saving the User Object in Mogodb
  const saveUser = await newUser.save();
  //token
  const token: string = jwt.sign({ _id: saveUser._id }, process.env.SECRET_TOKEN || 'secretToken');

  res.header('auth-token', token).json(saveUser);
};
export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate('role');

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
