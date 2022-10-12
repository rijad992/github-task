import { NextFunction, Request, Response } from 'express';
import { GeneralError } from '../../shared/Errors';

export const errorsMiddleware = async (
  error: GeneralError,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Promise<void> => {
  const err =
    error instanceof GeneralError
      ? error
      : new GeneralError({
          message: (error as Error)?.message ?? 'Unknown error',
        });
  const errorDetails = err.getErrorDetails();
  response.status(errorDetails.status).json({
    success: false,
    data: {
      message: errorDetails.message,
      status: errorDetails.status,
    },
  });
};
