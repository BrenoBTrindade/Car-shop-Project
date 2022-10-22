import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import CarController from '../../../controllers/Car';
import CarService from '../../../services/Car';
import Car from '../../../models/Car';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Teste da Car Controller', () => {
  const carModel = new Car();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore()
  });

  describe('Procurando todos os carros', () => {
    beforeEach(() => {
      sinon.stub(carService, 'read').resolves([carMockWithId]);
    });

    it('Fluxo de sucesso', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  });


  describe('Criando um carro', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(carMock);
    });

    it('Fluxo de sucesso', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    });
  });


  describe('Deletando um carro', () => {
    beforeEach(() => {
      sinon.stub(carService, 'delete').resolves(carMock);
    });

    it('Fluxo de sucesso', async () => {
      req.params = { id: carMockWithId._id };
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});