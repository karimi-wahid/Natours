import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { app } from './app.js';
import mongoose from 'mongoose';

const connectDb = async () => {
  mongoose.connection.on('connected', () => console.log('Database Connected'));
  await mongoose.connect(`${process.env.DATABASE_LOCAL}`);
};
connectDb();



const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
