import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dbConnect from '../../api/dbConnect.js';
import { carSchema } from './models/cars.js';

dotenv.config();

await dbConnect()
  .then(() => console.log('Connected to main MongoDB'))
  .catch(() => console.log('Error occured'));

const Cars = mongoose.model('stock', carSchema);

export { Cars };
