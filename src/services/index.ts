import ModuleDiscoveryService from "./moduleDiscoveryService";

const initAppServices = async () => {
  await ModuleDiscoveryService.instance.init();
};

export { initAppServices };
