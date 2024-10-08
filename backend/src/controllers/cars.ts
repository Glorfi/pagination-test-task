import { NextFunction, Request, Response } from 'express';
import { Cars } from '../db/mongoConnector.js';

export const getCars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
