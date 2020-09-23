import { Router } from 'express';
import { checkDuplicateUsernameOrEmail } from '../../security_module/middlewares/checkDuplicateUsernameOrEmail';
import { signIn, signUp, profile } from '../controllers/auth.controller';
import { tokenValidation } from '../../security_module/middlewares/verifyToken';
import { assignateRole } from '../../security_module/middlewares/assignateRole';
import { isSuperAdministrator } from '../../security_module/middlewares/isAdmin';
import { validateDataSignIn, validateDataUser } from '../middlewares/validateUser';

const router: Router = Router();

router.post('/signup', [validateDataUser, checkDuplicateUsernameOrEmail, assignateRole], signUp);
router.post('/signin', validateDataSignIn, signIn);
router.get('/profile', [tokenValidation, isSuperAdministrator], profile);
export default router;
