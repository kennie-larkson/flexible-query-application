export interface Pagination {
  page: number;
  limit: number;
  offset: number;
}

export interface Sorting {
  property: string;
  direction: string;
}

export interface Filtering {
  property: string;
  rule: string;
  value: string;
}

export enum FilterRule {
  EQUALS = 'eq',
  NOT_EQUALS = 'neq',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  LIKE = 'like',
  NOT_LIKE = 'nlike',
  IN = 'in',
  NOT_IN = 'nin',
  IS_NULL = 'isnull',
  IS_NOT_NULL = 'isnotnull',
}

export type PaginatedResource<T> = {
  totalItems: number;
  items: T[];
  page: number;
};
