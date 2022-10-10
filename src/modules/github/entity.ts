import OctokitService from '../../services/octokitService';

class Github {
  readonly octokitService: OctokitService;

  constructor({ OctokitService }) {
    this.octokitService = OctokitService;
  }

  getNonForkedUserRepositories = async (
    username: string,
  ): Promise<{ name: string; fork: boolean }[]> => {
    const res = await this.octokitService.octokit.rest.repos.listForUser({
      username,
    });

    const nonForkedRepos = res.data
      .filter((repo) => !repo.fork)
      .map(({ name, fork }) => ({
        name,
        fork,
      }));

    return nonForkedRepos;
  };
}

export default Github;
