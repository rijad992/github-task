import Github from './entity';
import controller, { GithubController } from './controller';
import { AppModule } from '../../models/appModule.model';

const moduleName = Github.name.toLowerCase();

export default { moduleName, entity: Github, controller } as AppModule<GithubController, Github>;