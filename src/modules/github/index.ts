import Github from './entity';
import { AppModule } from '../../core/models/appModule.model';
import GithubController from './controller';

const moduleName = 'Github';

export default {
  moduleName,
  entity: Github,
  controller: GithubController,
} as AppModule<typeof GithubController, typeof Github>;
