import { Octokit } from 'octokit';

class OctokitService {
  private _octokit: Octokit;

  constructor() {
    this.init();
  }

  get octokit(): Octokit {
    return this._octokit;
  }

  private init(): void {
    this._octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  }
}

export default OctokitService;
