import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  imgURL: string;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgURL: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IProduct>('Product', productSchema);
