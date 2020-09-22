import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
//Routes
import authRoutes from './router/auth.routes';
//initial Setup
import { createRoles, createSuperAdminstrator } from './libs/initialSetup';
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
export default app;
