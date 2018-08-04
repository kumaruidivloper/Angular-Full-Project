import {IFakerResult} from './data-fakers/faker.i';
import {TestRequestInterceptor} from './interceptors/test/test.request.interceptor';
import {QueryParamsRequestInterceptor} from './interceptors/query-parameters.request.interceptor';
import {QueryParamsResponseInterceptor} from './interceptors/query-parameters.response.interceptor';
import {IQueryParams, IResponse} from './interceptors/query-parameters.i';
import {IEnvironment} from './environment/environment.i';
import {Request, Response, NextFunction} from 'express';
import {json} from 'body-parser';
import {IServer} from './server.i';
import {DbService} from './services/db.service';
import {IDbService} from './services/db.service.i';
//import * as md5 from 'md5';

const jsonServer = require('json-server');
const environment: IEnvironment = <IEnvironment>require(`./environment/${process.env.NODE_ENV || 'local'}`);
const path = require('path');

interface IResponseHeader {
  field: string;
  value: string;
}

class Server implements IServer {
  private customRoutes = require(path.join(__dirname, './environment/routes.json'));
  private testRequestInterceptor: TestRequestInterceptor;
  private queryParamsRequestInterceptor: QueryParamsRequestInterceptor;
  private queryParamsResponseInterceptor = new QueryParamsResponseInterceptor();
  private server: any;
  private router: any;
  private queryParams: {[hash: string]: IQueryParams};
  private testOverviewService: IDbService;
  private userService: IDbService;
  private userGroupService: IDbService;
  private userSiteService: IDbService;

  constructor(private data: IFakerResult) {
    this.server = jsonServer.create();
    this.router = jsonServer.router(data);
    this.router.render = this.renderCustom.bind(this);
    this.testOverviewService = new DbService(this.router.db, 'test');
    this.userService = new DbService(this.router.db, 'user');
    this.userGroupService = new DbService(this.router.db, 'userGroup');
    this.userSiteService = new DbService(this.router.db, 'userSite');
    this.testRequestInterceptor = new TestRequestInterceptor(this.testOverviewService);
    this.queryParamsRequestInterceptor = new QueryParamsRequestInterceptor();
    this.queryParams = {};

    this.attachMiddleWares();
    this.server.use(this.router);
  }

  private allowCrossDomain(req: Request, res: Response, next: NextFunction) {
    const resHeaderOptions: IResponseHeader[] = [
      {
        field: 'Access-Control-Allow-Origin',
        value: environment.allowOrigin,
      }, {
        field: 'Access-Control-Allow-Methods',
        value: 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      }, {
        field: 'Access-Control-Allow-Headers',
        value: 'Access-Control-Allow-Origin,Content-Type, Authorization, Content-Length, X-Requested-With'
      }
    ];
    resHeaderOptions.forEach((headerOption: IResponseHeader) => {
      res.header(headerOption.field, headerOption.value);
    });
    next();
  }

  private normalizeRequestParams(req: Request, res: Response, next: NextFunction) {
    // we need to save original query parameters to be able to use/apply them in the response/render
    const urlHash = md5(req.url);
    this.queryParams[urlHash] = req.query;
    // remove empty parameters and apply _ naming convention for json-server action parameters
    this.queryParamsRequestInterceptor.normalizeParameters(req);
    next();
  }

  private attachMiddleWares(): void {
    this.server.use(jsonServer.defaults());
    this.server.use(json());
    this.server.use('api/test', this.testRequestInterceptor.intercept.bind(this.testRequestInterceptor));
    this.server.use(jsonServer.rewriter(this.customRoutes));
    this.server.use(this.allowCrossDomain);
    this.server.use(this.normalizeRequestParams.bind(this));
  }

  private renderCustom(req: Request, res: Response): void {
    const urlHash = md5(req.url);
    let response: IResponse<any>;
    let data = this.queryParamsResponseInterceptor.filterData(res.locals.data, this.queryParams[urlHash]);
    if (Array.isArray(data)) {
      response = this.queryParamsResponseInterceptor.paginate(data, this.queryParams[urlHash]);
    }
    res.jsonp(response || data);
  }

  start(): void {
    this.server.listen(environment.port, function () {
      console.log('JSON Server is running on http://localhost:' + environment.port);
    });
  }
}

export {Server};
