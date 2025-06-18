import express from 'express';
export const app = express();
app.use(express.json());

import tourRouter from './routes/tourRoutes.js' 
import userRouter from './routes/userRoutes.js' 
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)


