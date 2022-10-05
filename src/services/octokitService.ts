import { Octokit } from 'octokit';

class OctokitService {
  private static _instance: OctokitService;
  private _octokit: Octokit;

  private constructor() {
    if (OctokitService._instance) {
      throw new Error('Use instance instead of new');
    }

    OctokitService._instance = this;
    this.init();
  }

  static get instance() {
    return (
      OctokitService._instance ??
      (OctokitService._instance = new OctokitService())
    );
  }

  static get octokit() {
    return OctokitService.instance._octokit;
  }

  private init() {
    this._octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  }
}

export default OctokitService;
