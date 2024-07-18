import { AuthUser } from '@app/user/interface';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  FilterQuery,
  FindManyWrapper,
  IncludeQuery,
  SortQuery,
} from 'src/global/helper';
import { DocumentResult, FindOne } from 'src/global/interface';
import { PrismaService } from 'src/global/service';
import {
  createPostInput,
  findAllUserPost,
  findManyPost,
  findOneSlug,
  updatePostInput,
} from './interface';

@Injectable()
export class PostService {
  constructor(private ORM: PrismaService) {}

  async CreatePost(user: AuthUser, input: createPostInput): Promise<Post> {
    try {
      const { title } = input;
      const data = {
        ...input,
        slug: title.toLowerCase().replace(/\s/g, '-'),
        authorId: user.id,
      };

      return await this.ORM.post.create({ data });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(['Post already exist']);
        }
      }
      throw error;
    }
  }

  async FindSinglePost(para: findOneSlug): Promise<Post> {
    try {
      const find = await this.ORM.post.findFirst({
        where: { slug: para.slug },
      });
      if (!find) throw new ForbiddenException(['Post not found']);
      return find;
    } catch (error) {
      throw error;
    }
  }

  async FindManyPost(query: findManyPost): Promise<DocumentResult<Post>> {
    try {
      return await FindManyWrapper('post', this.getFindManyFilter(query));
    } catch (error) {
      throw error;
    }
  }

  async FindAllUserPost(
    query: findAllUserPost,
    user: AuthUser,
  ): Promise<DocumentResult<Post>> {
    const { page, limit } = query;
    try {
      return await FindManyWrapper('post', {
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {},
        where: { authorId: user.id },
        include: {},
      });
    } catch (error) {
      throw error;
    }
  }

  async Update(
    user: AuthUser,
    param: FindOne,
    data: updatePostInput,
  ): Promise<Post> {
    try {
      const find = await this.ORM.post.findUnique({ where: { id: param.id } });
      if (!find) throw new ForbiddenException(['Post not found']);

      if (user.id != find.authorId)
        throw new ForbiddenException(['Access daniel']);

      return await this.ORM.post.update({ where: { id: find.id }, data });
    } catch (error) {
      throw error;
    }
  }

  async DeletePost(user: AuthUser, param: FindOne): Promise<Post> {
    try {
      const find = await this.ORM.post.findUnique({ where: { id: param.id } });
      if (!find) throw new ForbiddenException(['Post not found']);

      if (user.id != find.authorId)
        throw new ForbiddenException(['Access daniel']);

      return await this.ORM.post.delete({ where: { id: find.id } });
    } catch (error) {
      throw error;
    }
  }

  private getFindManyFilter(query: findManyPost) {
    const { page, limit, sort, include, ...filters } = query;

    const where = FilterQuery(filters);
    const orderBy = SortQuery(sort);
    const prismaInclude = IncludeQuery(include);

    const condition = {
      skip: (page - 1) * limit,
      take: limit,
      orderBy,
      where,
      include: prismaInclude,
    };

    return condition;
  }
}
