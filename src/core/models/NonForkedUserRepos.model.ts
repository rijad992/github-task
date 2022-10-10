export interface NonForkedUserRepos {
  name: string;
  fork: boolean;
  branches: {
    name: string;
    latestCommitSha: string;
  }[];
}
