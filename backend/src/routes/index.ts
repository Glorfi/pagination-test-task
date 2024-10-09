import express from 'express';
import { Cars } from '../db/mongoConnector.js';
import { getCars, getMarkModels, getMarks } from '../controllers/cars.js';

export const router = express.Router();

router.get('/cars', getCars);
router.get('/cars/marks', getMarks);
router.get('/cars/:mark/models', getMarkModels);
