import { NextFunction, Request, Response } from 'express';

export const acceptHeaderseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  const accept = req.headers['accept'];
  if (!accept || accept !== 'application/json')
    return res.status(406).json({
      success: false,
      data: {
        status: 406,
        message: 'App only accepts application/json headers',
      },
    });
  return next();
};
