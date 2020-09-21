"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
router.post('/signup', auth_1.signUp);
router.post('/signin', auth_1.signIn);
router.get('/profile', verifyToken_1.tokenValidation, auth_1.profile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map