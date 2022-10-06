import Aigle from 'aigle';
import { AppModule } from '../models/appModule.model';
import GithubControllerClass from '../modules/github/controller';
import Github from '../modules/github/entity';
import { globFiles } from '../shared/index';

class ModuleDiscoveryService {
  private static _instance: ModuleDiscoveryService;
  private _modules: Record<string, AppModule<GithubControllerClass, Github>>;

  private constructor() {
    if (ModuleDiscoveryService._instance) {
      throw new Error('Use instance instead of new');
    }

    ModuleDiscoveryService._instance = this;
  }

  static get instance() {
    return (
      ModuleDiscoveryService._instance ??
      (ModuleDiscoveryService._instance = new ModuleDiscoveryService())
    );
  }

  private async getAllModules() {
    const modulePaths = globFiles('/src/modules/*/index.ts');

    return Aigle.transform<string, AppModule<GithubControllerClass, Github>>(
      modulePaths,
      async (result, modulePath) => {
        //@ts-ignore
        const module = (await import(`${modulePath}`)).default;
        result[module.moduleName] = module;
      },
      {},
    );
  }

  async init() {
    this._modules = await this.getAllModules();
  }

  getModules() {
    return this._modules;
  }
}

export default ModuleDiscoveryService;
