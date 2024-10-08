import mongoose, { Document } from 'mongoose';

interface IEngine {
  power: number;
  volume: number;
  transmission: string;
  fuel: string;
}

interface ICar {
  mark: string;
  model: string;
  engine: IEngine;
  drive: string;
  equipmentName: string;
  price: number;
  createdAt: Date;
}

export const carSchema = new mongoose.Schema<
  mongoose.SchemaDefinitionType<ICar>
>(
  {
    mark: { type: String, required: true },
    model: { type: String, required: true }, // Обновлено
    engine: {
      power: { type: Number, required: true },
      volume: { type: Number, required: true },
      transmission: { type: String, required: true },
      fuel: { type: String, required: true },
    },
    drive: { type: String, required: true },
    equipmentName: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'stock' }
);
