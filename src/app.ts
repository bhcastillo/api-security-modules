import express, { Application } from 'express';
import morgan from 'morgan';
import authRoutes from './router/auth.routes';

const app: Application = express();

//settings
app.set('PORT', 3000);
//middlewares
app.use(morgan('dev'));
//routes
app.use('/api/auth', authRoutes);
export default app;
