import {ITestRequestInterceptor} from './test.request.interceptor.i';
import {Request, Response, NextFunction} from 'express';
import {IDbService} from '../../services/db.service.i';


class TestRequestInterceptor implements ITestRequestInterceptor {

  constructor( private testOverviewService: IDbService) {}

  intercept(req: Request, res: Response, next: NextFunction): void {
    switch (req.method) {
      default:
        next();
    }
  }
}
export {TestRequestInterceptor};
