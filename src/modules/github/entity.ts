import { NonForkedUserRepos } from '../../models/NonForkedUserRepos.model';
import OctokitService from '../../services/octokitService';

class Github {
  readonly octokitService: OctokitService;

  constructor({ OctokitService }) {
    this.octokitService = OctokitService;
  }

  getNonForkedUserRepositories = async (
    username: string,
  ): Promise<{ name: string; fork: boolean }[]> => {
    const repos = (
      (
        await this.octokitService.octokit.request(
          `GET /users/${username}/repos`,
          {
            username,
          },
        )
      ).data as NonForkedUserRepos[]
    )
      .map(({ fork, name }) => ({ name, fork }))
      .filter((repo) => !repo.fork);

    return repos;
  };
}

export default Github;
