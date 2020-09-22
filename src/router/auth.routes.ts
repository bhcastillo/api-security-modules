import { Router } from 'express';
import { checkDuplicateUsernameOrEmail } from '../middlewares/verifySignUp';
import { signIn, signUp, profile } from '../controllers/auth.controller';
import { tokenValidation } from '../middlewares/verifyToken';
import { assignateRole } from '../middlewares/assignateRole';

const router: Router = Router();

router.post('/signup', [checkDuplicateUsernameOrEmail, assignateRole], signUp);
router.post('/signin', signIn);
router.get('/profile', tokenValidation, profile);
export default router;
