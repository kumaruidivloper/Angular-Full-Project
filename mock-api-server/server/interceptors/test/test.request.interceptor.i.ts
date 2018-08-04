import {Request, Response, NextFunction} from 'express';

interface ITestRequestInterceptor {
  intercept(req: Request, res: Response, next: NextFunction);
}


export {ITestRequestInterceptor};
