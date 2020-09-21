"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = __importDefault(require("./router/auth.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
//settings
app.set('PORT', 3000);
//middlewares
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
//routes
app.use('/api/auth', auth_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map