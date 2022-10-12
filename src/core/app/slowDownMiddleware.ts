import slowDown from 'express-slow-down';

export const slowDownMiddleware = slowDown({
  windowMs: 60000,
  delayAfter: 100,
  delayMs: 5000,
});
