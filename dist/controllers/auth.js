"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //saving a new user
    const user = new User_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    user.password = yield user.encryptPassword(user.password);
    const saveUser = yield user.save();
    //token
    const token = jsonwebtoken_1.default.sign({ _id: saveUser._id }, process.env.SECRET_TOKEN || 'secretToken');
    res.header('auth-token', token).json(saveUser);
});
exports.signIn = (req, res) => {
    res.json({ ok: 'true' });
};
exports.profile = (req, res) => {
    res.json({ ok: 'true' });
};
//# sourceMappingURL=auth.js.map