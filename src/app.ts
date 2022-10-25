import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorMiddleware';
import carRoutes from './routes/car.routes';
import motorcycleRoutes from './routes/motorcycle.routes';

const app = express();
app.use(express.json());
app.use(carRoutes);
app.use(motorcycleRoutes);
app.use(errorHandler);

export default app;
