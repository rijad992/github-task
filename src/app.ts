import express, { RequestHandler } from 'express';
import slowDown from 'express-slow-down';
import { each } from 'lodash';
import { Http } from './core/enums/http.enum';
import { createApiRoutes } from './modules';

const generateApiResponse = () => {
  const router = express.Router();
  router.all('*', (request, response) => {
    //@ts-ignore
    const preMadeResponse = request.premadeResponse || {};
    return response
      .status(200)
      .json({ success: true, data: preMadeResponse.responseObj });
  });
  return router;
};

const generateApiRoutes = () => {
  const router = express.Router();
  const modulesRoutesObject = createApiRoutes();

  each(modulesRoutesObject, (controller, moduleName) => {
    each(
      controller,
      (controllerFunction: RequestHandler, controllerFunctionName) => {
        switch (controllerFunction['httpMethod']) {
          case Http.GET:
            router.get(
              `/${moduleName.toLowerCase()}/${controllerFunctionName}`,
              controllerFunction,
            );
            break;
          case Http.POST:
            router.post(
              `/${moduleName.toLowerCase()}/${controllerFunctionName}`,
              controllerFunction,
            );
            break;
          default:
            throw new Error('Http method not defined');
        }
      },
    );
  });
  return router;
};

const initApp = async () => {
  const app = express();
  app.use(slowDown({ windowMs: 60000, delayAfter: 100, delayMs: 5000 }));
  app.use('/api', generateApiRoutes(), generateApiResponse());

  return app;
};

export { initApp };
