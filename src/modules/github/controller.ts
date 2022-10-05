import { Request, Response } from 'express';
import { BaseControler } from '../../models/BaseController.model';
import { ControllerRequestHandler } from '../../types/controllerRequestHandler.type';
import Github from './entity';

export interface GithubController extends BaseControler {
  findNonForkedUserRepositories: ControllerRequestHandler<any>
}

const findNonForkedUserRepositories: (
  req: Request,
  res: Response,
  next: (responseObj: any, err: Error) => void,
) => void = async (req, _res, next) => {
  const username = req.query.username as string;
  const repos = await Github.getNonForkedUserRepositories(username);

  
  next(repos, null);
};

export default { findNonForkedUserRepositories } as GithubController;
