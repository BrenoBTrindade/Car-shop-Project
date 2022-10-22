import { ICar } from "../../interfaces/ICar";

const carMock:ICar = {
  model: 'Mustang Gt',
  year: 1967,
  color: 'Black',
  status: false,
  buyValue: 469000,
  doorsQty: 2,
  seatsQty: 2,
};

const carMockWithId:ICar & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Mustang Gt',
  year: 1967,
  color: 'Black',
  status: false,
  buyValue: 469000,
  doorsQty: 2,
  seatsQty: 2,
};

const carMockForChange:Partial<ICar> = {
  color: 'White',
  status: true,
  buyValue: 500000,
};

const carMockForChangeWithId:ICar & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Mustang Gt',
  year: 1969,
  color: 'Red',
  status: false,
  buyValue: 470000,
  doorsQty: 2,
  seatsQty: 2,
};

export {
  carMock,
  carMockWithId,
  carMockForChange,
  carMockForChangeWithId,
}