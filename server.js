import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import { app } from './app.js';
import mongoose from 'mongoose';

const connectDb = async () => {
  mongoose.connection.on('connected', () => console.log('Database Connected'));
  await mongoose.connect(`${process.env.DATABASE_LOCAL}`);
};
connectDb();



const port = process.env.PORT || 2000;

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});


process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
  process.exit(1);
  })
})