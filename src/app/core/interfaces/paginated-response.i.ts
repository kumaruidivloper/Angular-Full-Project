import { Links } from './link.i';
import { PaginationParameters } from './pagination-params.i';

export interface PaginatedResponse<T> {
  data: T;
  links: Links;
  pagination: PaginationParameters;
}
