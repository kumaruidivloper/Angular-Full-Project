interface IQueryParams {
  embed?: string;
  q?: string;
  sort?: string;
  offset?: number;
  pageSize?: number;
  fields?: string;
  unique?: string;
  page?: number;
  groupBy?: string;
  aggregateBy?: string;
  [queryParam: string]: string|number;
}

interface IPagination {
  numberOfPages?: number;
  page?: number;
  pageSize?: number;
}

interface ILinks {
  prev?: { [key: string]: any };
  next?: { [key: string]: any };
  self: { [key: string]: any };
}

interface IResponse<T> {
  data: T[];
  links: ILinks;
  pagination: IPagination;
}

export {IQueryParams, IResponse};
