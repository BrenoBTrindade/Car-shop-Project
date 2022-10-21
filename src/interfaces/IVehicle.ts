import { z } from 'zod';

const vehicleSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'model must be at least 3 characters long' }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be an integer',
  }).min(1900).max(2022),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be at least 3 characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

type IVehicle = z.infer<typeof vehicleSchema>;

export { vehicleSchema, IVehicle };