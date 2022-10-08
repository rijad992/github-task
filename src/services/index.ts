import ModuleDiscoveryService from './moduleDiscoveryService';

const initAppServices = async (): Promise<void> => {
  await ModuleDiscoveryService.instance.init();
};

export { initAppServices };
