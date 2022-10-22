import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockForChange, carMockForChangeWithId, carMockWithId } from '../../mocks/carMock';

describe('Teste de CarService', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'read')
      .onCall(0).resolves([carMockWithId])
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'update')
      .onCall(0).resolves(carMockForChangeWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null);
    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe('Buscando todos os carros', () => {
    it('Fluxo de sucesso', async () => {
      const cars = await carService.read();

      expect(cars).to.be.an('array').that.includes(carMockWithId);
    });

    it('not found', async () => {
      let error;
      try {
        await carService.read();
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
    });
  });

  describe('Procurando um carro por id', () => {
    it('Fluxo de sucesso', async () => {
      const carById = await carService.readOne(carMockWithId._id);

      expect(carById).to.be.deep.equal(carMockWithId);
    });

    it('not found', async () => {
      let error;
      try {
        await carService.readOne('NOT_VALID_ID');
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
    });
  });

  describe('Criando um carro', () => {
    it('Fluxo de sucesso', async () => {
      const created = await carService.create(carMock);

      expect(created).to.be.deep.equal(carMockWithId);
    });

    it('Falha por não passar o body', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err:any) {
        error = err
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Atualizando um carro', () => {
    it('Fluxo de sucesso', async () => {
      const carUpdated = await carService.update(
          carMockForChangeWithId._id,
          carMockForChange
        );

      expect(carUpdated).to.be.deep.equal(carMockForChangeWithId);
    });

    it('not found', async () => {
      let error;
      try {
        await carService.update('1234', carMockForChange);
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
    });

    it('Falha por não passar o body', async () => {
      let error;
      try {
        await carService.update(carMockForChangeWithId._id, {});
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
    });
  });

  describe('Deletando um Carro', () => {
    it('Fluxo de sucesso', async () => {
      const deleted = await carService.delete(carMockWithId._id);

      expect(deleted).to.be.deep.equal(carMockWithId);
    });

    it('not found', async () => {
      let error;
      try {
        await carService.delete('NOT_VALID_ID');
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
    });
  });
});