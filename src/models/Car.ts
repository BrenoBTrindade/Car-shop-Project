import { model as mongoseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

export default class Car extends MongoModel<ICar> {
  constructor(model = mongoseCreateModel('Car', carMongooseSchema)) {
    super(model);
  }
}