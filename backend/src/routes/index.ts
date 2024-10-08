import express from 'express';
import { Cars } from '../db/mongoConnector.js';

export const router = express.Router();

router.get('/cars', async (req, res, next) => {
  const { mark, model, page = '1', limit = '20' } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const filter: any = {};
  if (mark) {
    filter.mark = mark;
  }
  if (model) {
    filter.model = model;
  }

  try {
    const cars = await Cars.find(filter)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalCars = await Cars.countDocuments(filter);
    const totalPages = Math.ceil(totalCars / limitNumber);

    res.send({
      totalCars,
      totalPages,
      currentPage: pageNumber,
      cars,
    });
  } catch (e) {
    next(e);
  }
});
router.get('/cars/marks', async (req, res, next) => {
  try {
    const marks = await Cars.aggregate([
      {
        $group: {
          _id: '$mark',
        },
      },
      {
        $project: {
          _id: 0,
          mark: '$_id',
        },
      },
    ]);
    res.send(marks);
  } catch (error) {
    next(error);
  }
});
