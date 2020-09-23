import { Request, Response, NextFunction } from 'express';

import Role from '../models/Role';

export const assignateRole = async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.body;
  console.log(role);
  if (!role) {
    //Serching role 'User'
    const roleUser = await Role.findOne({ name: 'User' });
    console.log(roleUser);
    req.body.role = roleUser?._id;
    next();
  } else {
    //validation There can only be one Super Administrator
    if (role === 'Super Administrator') {
      return res.status(401).json({ message: 'There can only be one Super Administrator' });
    }
    //searching Role
    const foundRole = await Role.findOne({ name: role });
    if (!foundRole) {
      return res.status(400).json({ message: 'Role Not Found' });
    }
    req.body.role = foundRole?._id;
    next();
  }
};
