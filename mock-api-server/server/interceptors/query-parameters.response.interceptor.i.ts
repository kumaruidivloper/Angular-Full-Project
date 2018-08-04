import {ITest} from '../models/test.i';
import {IQueryParams, IResponse} from './query-parameters.i';

type DataTypeOptions =  ITest | ITest[];

interface IQueryParamsResponseInterceptor {
  filterData(data: DataTypeOptions, queryParams: IQueryParams);
  paginate(response: any[], queryParams: IQueryParams): IResponse<any>;
}

export {IQueryParamsResponseInterceptor};
