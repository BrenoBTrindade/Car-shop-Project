import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockForChange, carMockForChangeWithId, carMockWithId } from '../../mocks/carMock';
import { ErrorTypes } from '../../../errors/catalog';

describe('Teste de CarModel', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findById').resolves(carMockWithId);
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('procura todos os carros', () => {
    it('fluxo de sucesso', async () => {
      const carList = await carModel.read();

      expect(carList).to.be.an('array').that.includes(carMockWithId);
    });
  });

  describe('procura um carro por id', () => {
    it('fluxo de sucesso', async () => {
      const carFound = await carModel.readOne(carMockWithId._id);

      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      let error;
      try {
        await carModel.readOne('124');
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });
  });

  describe('Criando um carro', () => {
    it('fluxo de sucesso', async () => {
      const newCar = await carModel.create(carMock);

      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Alterando um carro', () => {
    it('Fluxo de Sucesso', async () => {
      const carChanged = await carModel.update(
        carMockWithId._id,
        carMockForChange
      );

      expect(carChanged).to.be.deep.equal(carMockForChangeWithId);
    });

    it('_id not found', async () => {
      let error;
      try {
        await carModel.update('WRONG_ID', carMockForChange);
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });
  });

  describe('Deletando um carro', () => {
    it('Fluxo de sucesso', async () => {
      const carDeleted = await carModel.delete(carMockWithId._id);

      expect(carDeleted).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      let error;
      try {
        await carModel.delete('WRONG_ID');
      } catch (err:any) {
        error = err
      }

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });
  });
});