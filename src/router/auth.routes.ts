import { Router } from 'express';
import { signIn, signUp, profile } from '../controllers/auth';
import { tokenValidation } from '../libs/verifyToken';

const router: Router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', tokenValidation, profile);
export default router;
