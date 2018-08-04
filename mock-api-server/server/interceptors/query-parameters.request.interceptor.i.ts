import {Request} from 'express';

interface IQueryParametersRequestInterceptor {
  normalizeParameters(req: Request): void;
}

export {IQueryParametersRequestInterceptor};
