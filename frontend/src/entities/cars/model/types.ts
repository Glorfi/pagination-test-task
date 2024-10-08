export interface ICar {
  engine: IEngine
  _id: string
  mark: string
  model: any
  drive: string
  equipmentName: string
  price: number
  createdAt: string
}

export interface IEngine {
  power: number
  volume: number
  transmission: string
  fuel: string
}
