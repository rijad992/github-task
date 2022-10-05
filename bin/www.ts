import { initApp } from '../src/app';
import { initAppServices } from '../src/services/index';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const www = async () => {
  await initAppServices();
  const app = await initApp();
  const server = http.createServer(app);
  server.listen(process.env.PORT);
};

www();
