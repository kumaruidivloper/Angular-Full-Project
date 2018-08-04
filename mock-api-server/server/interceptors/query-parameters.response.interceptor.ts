import {IQueryParamsResponseInterceptor} from './query-parameters.response.interceptor.i';
import {groupBy, uniqBy, map, extend, cloneDeep, pick} from 'lodash';
import {IQueryParams, IResponse} from './query-parameters.i';

class QueryParamsResponseInterceptor implements IQueryParamsResponseInterceptor {
  filterData(data: any, queryParams: IQueryParams) {
    let filteredData = data;
    if (queryParams) {
      if (queryParams.unique) {
        filteredData = uniqBy(filteredData, queryParams.unique);
      }
      if (queryParams.fields) {
        filteredData = map(filteredData, (currentItem) => pick(currentItem, queryParams.fields.split(',')));
      }
      if (queryParams.groupBy) {
        filteredData = groupBy(filteredData, queryParams.groupBy);
      }
      if (queryParams.aggregateBy) {
        filteredData = groupBy(filteredData, queryParams.aggregateBy);
        for (let key in filteredData) {
          if (filteredData[key]) {
            filteredData[key] = filteredData[key].length;
          }
        }
      }
    }
    return filteredData;
  }

  paginate(data: any[], queryParams: IQueryParams): IResponse<any> {
    let filteredData: any[] = data;
    queryParams.page = Number(queryParams.page) || 1;
    queryParams.pageSize = Number(queryParams.pageSize) || 10;
    const numberOfPages: number = Math.ceil(data.length / queryParams.pageSize);
    const startIndex: number = (queryParams.page - 1) * queryParams.pageSize;
    filteredData = filteredData.splice(startIndex, queryParams.pageSize);

    const next: IQueryParams = queryParams.page + 1 <= numberOfPages ?
      extend(cloneDeep(queryParams), {page: queryParams.page + 1}) : undefined;

    const prev: IQueryParams = queryParams.page - 1 > 0 ?
      extend(cloneDeep(queryParams), {page: queryParams.page - 1}) : undefined;

    return {
      data: filteredData,
      links: {
        next: next,
        prev: prev,
        self: queryParams
      },
      pagination: {
        numberOfPages: numberOfPages,
        page: queryParams.page,
        pageSize: queryParams.pageSize
      }
    };
  }
}
export {QueryParamsResponseInterceptor};
