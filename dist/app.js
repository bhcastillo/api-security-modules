"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
//Routes
const auth_routes_1 = __importDefault(require("./security_module/router/auth.routes"));
const products_routes_1 = __importDefault(require("./product_module/routes/products.routes"));
//initial Setup
const initialSetup_1 = require("./security_module/libs/initialSetup");
// environment  variables
dotenv_1.default.config();
const app = express_1.default();
initialSetup_1.createRoles();
initialSetup_1.createSuperAdminstrator();
//settings
app.set('PORT', 3000);
//middlewares
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
//routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api', products_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map