import express, {
  Application,
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import slowDown from 'express-slow-down';
import { each } from 'lodash';
import { Http } from './core/enums/http.enum';
import { createApiRoutes } from './modules';
import { GeneralError } from './shared/Errors';
import * as swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { globFiles } from './shared';

const generateSwaggerDocs = () => {
  const controllerPaths = globFiles(
    path.join(__dirname, '/modules/*/controller.{ts,js}'),
  );
  const options = {
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Github task project',
        version: '1.0.0',
      },
    },
    apis: controllerPaths,
  };

  return swaggerJSDoc(options);
};

const acceptHeaderseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  const contentType = req.headers['accept'];
  if (!contentType || contentType !== 'application/json')
    return res.status(406).json({
      success: false,
      data: {
        status: 406,
        message: 'App only accepts application/json headers',
      },
    });
  return next();
};

const generateApiRoutes = (): Router => {
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

const generateApiResponse = (): Router => {
  const router = express.Router();

  router.all('*', (request, response) => {
    const preMadeResponse = request.premadeResponse;

    if (!preMadeResponse)
      return response.status(404).json({
        success: false,
        data: {
          status: 404,
          message: 'Route not found. Please check API documentation.',
        },
      });

    return response
      .status(200)
      .json({ success: true, data: preMadeResponse?.responseObj || {} });
  });
  return router;
};

const errorsMiddleware = async (
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

const initApp = async (): Promise<Application> => {
  const app = express();
  app.use(slowDown({ windowMs: 60000, delayAfter: 100, delayMs: 5000 }));
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(generateSwaggerDocs()));
  app.use(acceptHeaderseMiddleware);
  app.use('/api', generateApiRoutes(), generateApiResponse());
  app.use(errorsMiddleware);
  return app;
};

export { initApp };
