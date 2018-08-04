import {IQueryParametersRequestInterceptor} from './query-parameters.request.interceptor.i';
import {IQueryParams} from './query-parameters.i';
import {isArray, isString, pickBy} from 'lodash';
import {Request} from 'express';

enum SortingParams {
  FIELD,
  ORDER
}

class QueryParamsRequestInterceptor implements IQueryParametersRequestInterceptor {
  private paramsToRename: string[] = ['embed', 'sort', 'expand'];

  private getParameterWithoutWildcardsAndSuffixByLike(queryParams: IQueryParams, paramKey: string): IQueryParams {
    if (paramKey && queryParams[paramKey] && typeof queryParams[paramKey] === 'string'
      && (<string>queryParams[paramKey]).indexOf('*') !== -1) {
      const translatedName = `${paramKey}_like`;
      queryParams[translatedName] = (<string>queryParams[paramKey]).replace(/\*/g, '');
      delete queryParams[paramKey];
    }
    return queryParams;
  }

  private splitSortingParam(sortQueryParams: string): string[] {
    const sortingParams = sortQueryParams.split(',');

    return [
      sortingParams.map((param: string): string => param.split('-')[SortingParams.FIELD]).join(','),
      sortingParams.map((param: string): string => param.split('-')[SortingParams.ORDER]).join(',')
    ];
  }

  private getRenamedActionParameter(queryParams: IQueryParams, paramKey: string): IQueryParams {
    if (paramKey && queryParams[paramKey] && this.paramsToRename.indexOf(paramKey) !== -1) {
      if (paramKey === 'sort') {
        [queryParams['_sort'], queryParams['_order']] = this.splitSortingParam(queryParams.sort);
      } else {
        queryParams[`_${paramKey}`] = queryParams[paramKey];
      }
      delete queryParams[paramKey];
    }
    return queryParams;
  }

  private getNegatedParameter(queryParams: IQueryParams, paramKey: string): IQueryParams {
    if (paramKey && queryParams[paramKey] && typeof queryParams[paramKey] === 'string'
      && (<string>queryParams[paramKey]).indexOf('!') === 0) {
      const translatedName = `${paramKey}_ne`;
      queryParams[translatedName] = (<string>queryParams[paramKey]).slice(1);
      delete queryParams[paramKey];
    }
    return queryParams;
  }

  private pickQueryParameter(queryParams: IQueryParams): IQueryParams {
    return <IQueryParams>pickBy(queryParams, (param) => {
      if (isString(param)) {
        return param.trim() !== '';
      } else if (isArray(param)) {
        return param.length > 0;
      } else {
        return true;
      }
    });
  }

  normalizeParameters(req: Request): void {
    let queryParams: IQueryParams = req.query;
    if (queryParams) {
      queryParams = this.pickQueryParameter(queryParams);

      for (let paramKey in queryParams) {
        queryParams = this.getParameterWithoutWildcardsAndSuffixByLike(queryParams, paramKey);
        queryParams = this.getRenamedActionParameter(queryParams, paramKey);
        queryParams = this.getNegatedParameter(queryParams, paramKey);
      }
    }
    req.query = queryParams;
  }
}
export {QueryParamsRequestInterceptor};
