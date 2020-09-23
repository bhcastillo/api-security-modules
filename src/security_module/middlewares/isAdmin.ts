import { Request, Response, NextFunction } from 'express';
import Role from '../models/Role';
import User from '../models/User';

export const isSuperAdministrator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId);
    const role = await Role.findById(user?.role);

    if (role?.name === 'Super Administrator') {
      next();
      return;
    }
    return res.status(403).json({ message: 'Require Super Administrador' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
