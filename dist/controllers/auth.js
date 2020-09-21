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
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(404).json({ message: 'Email or password is wrong' });
    const correctPassword = yield user.validatePassword(req.body.password);
    if (!correctPassword)
        return res.status(403).json({ message: 'Invalid Password' });
    const token = jsonwebtoken_1.default.sign({ _id: user.id }, process.env.SECRET_TOKEN || 'secretToken', {
        expiresIn: 60 * 60 * 24,
    });
    res.header('auth-token', token).json(user);
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId, { password: 0 });
    if (!user)
        return res.status(404).json({ message: 'No User Found' });
    res.json(user);
});
//# sourceMappingURL=auth.js.map