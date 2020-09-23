import express, { Application } from 'express';
import morgan, { token } from 'morgan';
import dotenv from 'dotenv';
//Routes
import authRoutes from './security_module/router/auth.routes';
import productsRoutes from './product_module/routes/products.routes';

//initial Setup
import { createRoles, createSuperAdminstrator } from './security_module/libs/initialSetup';
import { tokenValidation } from './security_module/middlewares/verifyToken';
// environment  variables
dotenv.config();

const app: Application = express();
createRoles();
createSuperAdminstrator();

//settings
app.set('PORT', 3000);
//middlewares
app.use(express.json());
app.use(morgan('dev'));
//routes
app.use('/api/auth', authRoutes);
app.use('/api', tokenValidation, productsRoutes);

export default app;
