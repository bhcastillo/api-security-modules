import { Request, Response, NextFunction } from 'express';

export const assignateImgURL = (req: Request, res: Response, next: NextFunction) => {
  const { name, category } = req.body;
  const imgUrl: string = `assets/products/${category}/${name}.jpg`;
  req.body.imgURL = imgUrl;
  next();
};
