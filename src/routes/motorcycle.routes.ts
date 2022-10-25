import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleModel from '../models/Motorcycle';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

const PATH_ID = '/motorcycles/:id';

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
route.get(PATH_ID, (req, res) => motorcycleController.readOne(req, res));
route.put(PATH_ID, (req, res) => motorcycleController.update(req, res));
route.delete(PATH_ID, (req, res) => motorcycleController.delete(req, res));

export default route;