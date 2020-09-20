import { Router } from 'express';
import { signIn, signUp, profile } from '../controllers/auth';

const router: Router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', profile);
export default router;
