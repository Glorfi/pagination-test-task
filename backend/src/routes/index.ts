import express from 'express';
import { Cars } from '../db/mongoConnector.js';
import { getCars } from '../controllers/cars.js';

export const router = express.Router();

router.get('/cars', getCars);
router.get('/cars/marks', async (req, res, next) => {
  try {
    const marks = await Cars.aggregate([
      {
        $group: {
          _id: '$mark',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          mark: '$_id',
          count: 1,
        },
      },
    ]);
    res.send(marks);
  } catch (error) {
    next(error);
  }
});
