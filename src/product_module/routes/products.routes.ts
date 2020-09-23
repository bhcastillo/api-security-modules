import { Router } from 'express';

import {
  getProducts,
  postProduct,
  getProduct,
  putProductById,
} from '../controllers/products.controller';
import { validateProduct } from '../middlewares/validateProduct';
import { assignateImgURL } from '../middlewares/assignateimgURL';
import { deleteProductById } from '../controllers/products.controller';

const router: Router = Router();

router.get('/products', getProducts);
router.get('/product/:id', getProduct);
router.post('/product', [validateProduct, assignateImgURL], postProduct);
router.put('/product/:id', [validateProduct, assignateImgURL], putProductById);
router.delete('/product/:id', deleteProductById);

export default router;
