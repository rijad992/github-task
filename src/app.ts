import express, { Application } from 'express';
import slowDown from 'express-slow-down';
import { generateSwagger } from './core/app/swagger';
import { acceptHeaderseMiddleware } from './core/app/acceptHeadersMiddleware';
import { errorsMiddleware } from './core/app/errorsMiddleware';
import { generateApiRoutes } from './core/app/generateApiRoutes';
import { generateApiResponse } from './core/app/generateApiResponse';

const initApp = async (): Promise<Application> => {
  const app = express();
  app.use(slowDown({ windowMs: 60000, delayAfter: 100, delayMs: 5000 }));
  app.use(generateSwagger());
  app.use(acceptHeaderseMiddleware);
  app.use('/api', generateApiRoutes(), generateApiResponse());
  app.use(errorsMiddleware);
  return app;
};

export { initApp };
