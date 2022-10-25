import { z } from 'zod';
import { vehicleSchema } from './IVehicle';

const motorcycleZodSchema = vehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number()
    .int()
    .nonnegative()
    .min(1)
    .max(2500),
});

type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export { motorcycleZodSchema, IMotorcycle };