import { RequestHandler } from 'express';
import transform from 'lodash/transform';
import { container } from '../core/di-container/di-container';
import { BaseControler } from '../models/BaseController.model';
import ModuleDiscoveryService from '../services/moduleDiscoveryService';
import { ControllerRequestHandler } from '../types/controllerRequestHandler.type';

const wrapControlerFunction = (
  moduleName: string,
  controllerFunctionName: string,
  controllerFunction: ControllerRequestHandler<any>,
) => {
  const handler: RequestHandler = async (req, res, next) => {
    try {
      const moduleFunctionPath = `${moduleName}/${controllerFunctionName}`;
      await controllerFunction(req, res, (responseObj: any, error: Error) => {
        req.premadeResponse = { moduleFunctionPath, responseObj };
        next(error);
      });
    } catch (error) {
      next(error);
    }
  };
  handler['httpMethod'] = controllerFunction['httpMethod'];
  return handler;
};

const createApiRoute = (moduleName: string, controller: BaseControler) => {
  const apiRoutes: Record<string, RequestHandler> = {};

  for (const methodName in controller) {
    if (typeof controller[methodName] == 'function') {
      apiRoutes[methodName] = wrapControlerFunction(
        moduleName,
        methodName,
        controller[methodName],
      );
    }
  }
  return apiRoutes;
};

const createApiRoutes = () => {
  return transform(
    ModuleDiscoveryService.instance.getModules(),
    (moduleApiRoutes, module) => {
      const { moduleName } = module;
      const controllerInstance = container.resolve<BaseControler>(
        `${moduleName}Controller`,
      );
      moduleApiRoutes[moduleName] = createApiRoute(
        moduleName,
        controllerInstance,
      );
    },
    {},
  );
};

export { createApiRoutes };
