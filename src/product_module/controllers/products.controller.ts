import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.status(200).json(products);
};
export const getProduct = async (req: Request, res: Response) => {
  const { idProduct } = req.params;
  const product = await Product.findById(idProduct);
  res.status(200).json(product);
};
export const postProduct = async (req: Request, res: Response) => {
  const { name, category, price, imgURL } = req.body;

  const product = new Product({
    name,
    category,
    price,
    imgURL,
  });
  product.save();
  res.status(200).json(product);
};
