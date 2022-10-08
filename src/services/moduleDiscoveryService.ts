import Aigle from 'aigle';
import path from 'path';
import { AppModule } from '../models/appModule.model';
import { BaseControler } from '../models/BaseController.model';
import Github from '../modules/github/entity';
import { globFiles } from '../shared/index';

class ModuleDiscoveryService {
  private static _instance: ModuleDiscoveryService;
  private _modules: Record<string, AppModule<BaseControler, Github>>;

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
    const modulePaths = globFiles(path.join(__dirname, '../modules/*/index.{ts,js}'));
    return Aigle.transform<string, AppModule<BaseControler, Github>>(
      modulePaths,
      async (result, modulePath) => {
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
