export const FilterQuery = (filters: any) => {
  let where = {};
  if (Object.keys(filters).length > 0) {
    where = {
      AND: Object.entries(filters).map(([field, value]) => ({
        [field]: { equals: value },
      })),
    };
  }

  return where;
};

export const SortQuery = (sort: string | string[]) => {
  let orderBy: any = {};
  if (Array.isArray(sort)) {
    orderBy = sort.map((field: string) => ({ [field]: 'desc' }));
  } else if (typeof sort === 'string') {
    orderBy = { [sort]: 'desc' };
  }

  return orderBy;
};

export const IncludeQuery = (include: string | string[]) => {
  let prismaInclude: any = {};
  if (Array.isArray(include)) {
    prismaInclude = Object.fromEntries(
      include.map((field: string) => [field, true]),
    );
  } else if (typeof include !== 'undefined') {
    prismaInclude = { [include]: true };
  }

  return prismaInclude;
};
