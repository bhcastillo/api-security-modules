"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifySignUp_1 = require("../middlewares/verifySignUp");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const assignateRole_1 = require("../middlewares/assignateRole");
const router = express_1.Router();
router.post('/signup', [verifySignUp_1.checkDuplicateUsernameOrEmail, assignateRole_1.assignateRole], auth_controller_1.signUp);
router.post('/signin', auth_controller_1.signIn);
router.get('/profile', verifyToken_1.tokenValidation, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map