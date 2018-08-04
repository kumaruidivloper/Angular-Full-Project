export interface Links {
  next?: Link;
  prev?: Link;
  self: Link;
}

export interface Link {
  page: number;
  pageSize: number;
}
