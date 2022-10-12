import express, { Application } from 'express';
import { generateSwagger } from './core/app/swagger';
import { acceptHeaderseMiddleware } from './core/app/acceptHeadersMiddleware';
import { errorsMiddleware } from './core/app/errorsMiddleware';
import { generateApiRoutes } from './core/app/generateApiRoutes';
import { generateApiResponse } from './core/app/generateApiResponse';
import { slowDownMiddleware } from './core/app/slowDownMiddleware';

const initApp = async (): Promise<Application> => {
  const app = express();
  app.use(slowDownMiddleware);
  app.use(generateSwagger());
  app.use(acceptHeaderseMiddleware);
  app.use('/api', generateApiRoutes(), generateApiResponse());
  app.use(errorsMiddleware);
  return app;
};

export { initApp };
