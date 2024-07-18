import { Logger } from '@nestjs/common';
import { prisma } from '../middleware';
import { DocumentResult } from '../interface';

const logger = new Logger('FindManyWrapper');
export const FindManyWrapper = async <T>(
  model: string,
  condition: {
    skip: number;
    take: number;
    orderBy: {};
    where: {};
    include: {};
  },
): Promise<DocumentResult<T>> => {
  try {
    const { skip, take, where } = condition;
    const data = await prisma[model].findMany(condition);
    const totalCount = await prisma[model].count({ where });
    const currentPage = skip / take + 1;
    const totalPages = Math.ceil(totalCount / take);
    const hasNextPage = skip + take < totalCount;
    const hasPrevPage = currentPage > 1;

    logger.debug(condition);
    return {
      data,
      totalCount,
      currentPage,
      totalPages,
      hasNextPage,
      hasPrevPage,
    };
  } catch (error) {
    logger.error({ 'Find many wrapper error': error });
    throw error;
  }
};
