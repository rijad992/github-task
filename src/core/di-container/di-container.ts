import * as awilix from 'awilix';
import GithubController from '../../modules/github/controller';
import Github from '../../modules/github/entity';
import OctokitService from '../../services/octokitService';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

function diSetupInit(): void {
  container.register({
    GithubController: awilix.asClass(GithubController),
    Github: awilix.asClass(Github),
    OctokitService: awilix.asClass(OctokitService),
  });
}

export { container, diSetupInit };
