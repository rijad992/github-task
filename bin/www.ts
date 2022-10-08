import { initApp } from '../src/app';
import { initAppServices } from '../src/services/index';
import dotenv from 'dotenv';
import http from 'http';
import { diSetupInit } from '../src/core/di-container/di-container';

dotenv.config();

const www = async (): Promise<void> => {
  diSetupInit();
  await initAppServices();
  const app = await initApp();
  const server = http.createServer(app);
  server.listen(process.env.PORT);
};

www();
