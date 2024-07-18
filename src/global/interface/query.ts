export type FindMany = {
  page?: number;
  limit?: number;
  sort?: string | string[];
  include?: string | string[];
  filters?: Record<string, any>;
};

export interface FindSingleBlog {
  slug: string;
}

export interface FindOne {
  id: string;
}

export interface DocumentResult<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
