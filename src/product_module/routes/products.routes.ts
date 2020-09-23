import { Router } from 'express';

import { getProducts, postProduct, getProduct } from '../controllers/products.controller';
import { tokenValidation } from '../../security_module/middlewares/verifyToken';

const router: Router = Router();

router.get('/products', tokenValidation, getProducts);
router.get('/product/:id', tokenValidation, getProduct);
router.post('/product', tokenValidation, postProduct);

export default router;
