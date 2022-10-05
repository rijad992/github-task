import { Request, Response } from 'express';

export type ControllerRequestHandler<T> = (
  req: Request,
  res: Response,
  next: (responseObj: T, error: Error) => void,
) => Promise<void>;
