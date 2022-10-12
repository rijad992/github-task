import express, { Router } from 'express';

export const generateApiResponse = (): Router => {
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
