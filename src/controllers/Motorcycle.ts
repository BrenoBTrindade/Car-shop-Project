import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

class MotorcycleController {
  private _service:IService<IMotorcycle>;

  constructor(service:IService<IMotorcycle>) {
    this._service = service;
  }
  public async create(req:Request, res:Response<IMotorcycle>) {
    const result = await this._service.create(req.body);
    return res.status(201).json(result);
  }

  public async read(_req:Request, res:Response<IMotorcycle[]>) {
    const motorCyles = await this._service.read();
    return res.status(200).json(motorCyles);
  }

  public async readOne(req:Request, res:Response<IMotorcycle>) {
    const allMotorCyles = await this._service.readOne(req.params.id);
    return res.status(200).json(allMotorCyles);
  }

  public async update(req:Request, res:Response<IMotorcycle>) {
    const motorcycleUpdated = await this._service.update(req.params.id, req.body);
    return res.status(200).json(motorcycleUpdated);
  }

  public async delete(req:Request, res:Response<IMotorcycle>) {
    const motorcycleDeleted = await this._service.delete(req.params.id);
    return res.status(204).json(motorcycleDeleted);
  }
}

export default MotorcycleController;