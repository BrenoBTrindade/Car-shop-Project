import { ICar, carSchema } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default class CarService implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._car.create(parsed.data);
  }

  public async read():Promise<ICar[]> {
    const cars = await this._car.read();
    if (!cars) throw new Error(ErrorTypes.EntityNotFound);
    return cars;
  }

  public async readOne(_id:string):Promise<ICar> {
    const carById = await this._car.readOne(_id);
    if (!carById) throw new Error(ErrorTypes.EntityNotFound);
    return carById;
  }

  public async delete(_id:string):Promise<ICar> {
    const carDeleted = await this._car.delete(_id);
    if (!carDeleted) throw new Error(ErrorTypes.EntityNotFound);
    return carDeleted;
  }

  public async update(_id: string, obj: unknown):Promise<ICar> {
    if (JSON.stringify(obj) === '{}') throw new Error(ErrorTypes.InvalidObj);
    const parsed = carSchema.partial().safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const carUpdated = await this._car.update(_id, parsed.data);
    if (!carUpdated) throw new Error(ErrorTypes.EntityNotFound);
    return carUpdated;
  }
}