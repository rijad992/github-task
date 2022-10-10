import { Request, Response } from 'express';
import Github from './entity';

import { BaseControler } from '../../models/BaseController.model';
import { Get } from '../../core/decorators/http.decorator';
import { GithubResponseError } from '../../shared/Errors';
import GithubRequestError from '../../models/GithubRequestError.model';

class GithubController implements BaseControler {
  entity: Github;
  entityName = 'Github';

  constructor({ Github }) {
    this.entity = Github;
  }

  @Get
  async findNonForkedUserRepositories(
    req: Request,
    _res: Response,
    next: (responseObj: { name: string; fork: boolean }[], err: Error) => void,
  ): Promise<void> {
    try {
      const username = req.query.username as string;
      const repos = await this.entity.getNonForkedUserRepositories(username);
      next(repos, null);
    } catch (err) {
      throw new GithubResponseError({
        status: (err as GithubRequestError).status,
        message: (err as GithubRequestError).message,
      });
    }
  }
}

export default GithubController;
