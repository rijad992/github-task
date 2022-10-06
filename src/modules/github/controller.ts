import { Request, Response } from 'express';
import Github from './entity';

import { BaseControler } from '../../models/BaseController.model';

class GithubController implements BaseControler {
  readonly entity: Github;

  constructor({ Github }) {
    this.entity = Github;
  }

  findNonForkedUserRepositories = async (
    req: Request,
    _res: Response,
    next: (responseObj: any, err: Error) => void,
  ) => {
    const username = req.query.username as string;
    const repos = await this.entity.getNonForkedUserRepositories(username);

    next(repos, null);
  };
}

export default GithubController;
