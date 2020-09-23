import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.status(200).json(products);
};
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: 'Id Product Not found' });
  }
};
export const postProduct = async (req: Request, res: Response) => {
  const { name, category, price, imgURL } = req.body;
  console.log('img:', imgURL);
  const product = new Product({
    name,
    category,
    price,
    imgURL,
  });
  console.log(product);
  product.save();
  res.status(200).json(product);
};
export const putProductById = async (req: Request, res: Response) => {
  try {
    const putProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (putProduct) return res.status(200).json(putProduct);
    throw new Error('Id Product Not found');
  } catch (err) {
    res.status(404).json({ message: 'Id Product Not found' });
  }
};
export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const deleteProduct = await Product.findByIdAndRemove(req.params.id);
    if (deleteProduct) return res.status(200).json({ message: 'Product deleted!' });
    throw new Error('Id Product Not found');
  } catch (err) {
    res.status(404).json({ message: 'Id Product Not found' });
  }
};
