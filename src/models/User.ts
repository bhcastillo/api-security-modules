import { Schema, model, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';
import { IRole } from './Role';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: IRole['_id'];
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};
userSchema.methods.validatePassword = function (password: string): Promise<boolean> {
  return bcryptjs.compare(password, this.password);
};
export default model<IUser>('User', userSchema);
