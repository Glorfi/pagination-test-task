import { NextFunction, Request, Response } from 'express';
import { Cars } from '../db/mongoConnector.js';
import { NotFound } from '../errors/NotFound.js';

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
    const modelsArray = (model as string).split(',');
    filter.model = { $in: modelsArray };
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

export const getMarks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const getMarkModels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mark } = req.params;

  try {
    // Поиск автомобилей по марке
    const cars = await Cars.find({ mark }).select('model -_id');

    // Если автомобили не найдены
    if (cars.length === 0) {
      throw new NotFound('No models found for this mark');
    }

    // Извлечение моделей из результата
    const models = Array.from(new Set(cars.map((car) => car.model)));

    // Возврат массива моделей
    return res.send(models);
  } catch (error) {
    next(error);
  }
};
