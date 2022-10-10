import { NonForkedUserRepos } from '../../core/models/NonForkedUserRepos.model';
import OctokitService from '../../services/octokitService';

class Github {
  readonly octokitService: OctokitService;

  constructor({ OctokitService }) {
    this.octokitService = OctokitService;
  }

  getNonForkedUserRepositories = async (
    username: string,
  ): Promise<NonForkedUserRepos[]> => {
    const res = await this.octokitService.octokit.rest.repos.listForUser({
      username,
    });

    const nonForkedRepos = await Promise.all(
      res.data
        .filter((repo) => !repo.fork)
        .map(async ({ name, fork }) => ({
          name,
          fork,
          branches: (
            await this.octokitService.octokit.rest.repos.listBranches({
              owner: username,
              repo: name,
            })
          ).data.map(({ name, commit }) => ({
            name,
            latestCommitSha: commit.sha,
          })),
        })),
    );

    return nonForkedRepos;
  };
}

export default Github;
