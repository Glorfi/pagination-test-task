import { ICar } from '@/entities/cars';

export interface IGetCarsQueryParams {
  mark?: string;
  page?: string | number;
  model?: string;
}

export interface IGetCarsResponse {
  totalCars: number;
  totalPages: number;
  currentPage: number;
  cars: ICar[];
}
