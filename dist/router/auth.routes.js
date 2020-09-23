"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkDuplicateUsernameOrEmail_1 = require("../module_security/middlewares/checkDuplicateUsernameOrEmail");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_1 = require("../module_security/middlewares/verifyToken");
const assignateRole_1 = require("../module_security/middlewares/assignateRole");
const isAdmin_1 = require("../module_security/middlewares/isAdmin");
const router = express_1.Router();
router.post('/signup', [checkDuplicateUsernameOrEmail_1.checkDuplicateUsernameOrEmail, assignateRole_1.assignateRole], auth_controller_1.signUp);
router.post('/signin', auth_controller_1.signIn);
router.get('/profile', [verifyToken_1.tokenValidation, isAdmin_1.isSuperAdministrator], auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map