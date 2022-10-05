import { NonForkedUserRepos } from '../../models/NonForkedUserRepos.model';
import OctokitService from '../../services/octokitService';

class Github {
  static async getNonForkedUserRepositories(username: string) {
    const repos = (
      (
        await OctokitService.octokit.request(`GET /users/${username}/repos`, {
          username,
        })
      ).data as NonForkedUserRepos[]
    )
      .map(({ fork, name }) => ({ name, fork }))
      .filter((repo) => !repo.fork);

    return repos;
  }
}

export default Github;
