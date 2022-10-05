import { RequestHandler } from 'express';
import transform from 'lodash/transform';
import ModuleDiscoveryService from '../services/moduleDiscoveryService';
import { ControllerRequestHandler } from '../types/controllerRequestHandler.type';
import { GithubController } from './github/controller';

const wrapControlerFunction = (
  moduleName: string,
  controllerFunctionName: string,
  controllerFunction: ControllerRequestHandler<any>,
) => {
  const handler: RequestHandler = async (req, res, next) => {
    try {
      const moduleFunctionPath = `${moduleName}/${controllerFunctionName}`;
      await controllerFunction(req, res, (responseObj: any, error: Error) => {
        //@ts-ignore
        req.premadeResponse = { moduleFunctionPath, responseObj };
        next(error);
      });
    } catch (error) {
      next(error);
    }
  };
  return handler;
};

const createApiRoute = (moduleName: string, controller: GithubController) => {
  return transform(
    controller,
    (moduleApiRoutes, controllerFunction) => {
      const controllerFunctionName = controllerFunction.name;
      moduleApiRoutes[controllerFunctionName] = wrapControlerFunction(
        moduleName,
        controllerFunctionName,
        controllerFunction,
      );
    },
    {},
  );
};

const createApiRoutes = () => {
  return transform(
    ModuleDiscoveryService.instance.getModules(),
    (moduleApiRoutes, module) => {
      const { moduleName, controller } = module;
      moduleApiRoutes[moduleName] = createApiRoute(moduleName, controller);
    },
    {},
  );
};

export { createApiRoutes };
