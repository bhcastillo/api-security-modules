import Role, { IRole } from '../models/Role';
import User from '../models/User';
import { IUser } from '../models/User';

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();
    // check for existing roles
    if (count > 0) return;
    //Create default Roles
    const values = await Promise.all([
      new Role({ name: 'Super Administrator' }).save(),
      new Role({ name: 'Administrator' }).save(),
      new Role({ name: 'User' }).save(),
    ]);
    console.log(`***** Creating Roles ****** \n \n ${values}`);
  } catch (err) {
    console.error(err);
  }
};
export const createSuperAdminstrator = async () => {
  //Check for an existing 'Super Administrator'
  const user = await User.findOne({ email: 'superAdministrator@localhost.com' });
  //Get role_id of Super Administrator
  const roleSuperAdministrator = await Role.findOne({ name: 'Super Administrator' });

  if (!user && roleSuperAdministrator) {
    //Create a Super Administrator
    const newUser: IUser = new User({
      username: 'Super Administrator',
      email: 'superAdministrator@localhost.com',
      password: 'superadministrator',
      role: roleSuperAdministrator?._id,
    });
    newUser.password = await newUser.encryptPassword(newUser.password);
    await newUser.save();
    console.log('Super Administrator created!');
  }
};
