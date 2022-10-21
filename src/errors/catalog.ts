export enum ErrorTypes {
  NotFound = 'NotFound',
  InvalidInput = 'InvalidInput',
}

type ErrorResponseObject = {
  message: string;
  httpStatus: number
};

export type ErrorCatalog = {
  [key in ErrorTypes] : ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  NotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  InvalidInput: {
    message: 'Invalid input data',
    httpStatus: 400,
  },
};