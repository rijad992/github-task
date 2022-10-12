import express, { RequestHandler, Router } from 'express';
import { each } from 'lodash';
import { createApiRoutes } from '../../modules';
import { Http } from '../enums/http.enum';

export const generateApiRoutes = (): Router => {
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
