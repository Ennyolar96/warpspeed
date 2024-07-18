import { Post } from '@prisma/client';
import { FindMany } from 'src/global/interface';

export type createPostInput = Omit<
  Post,
  'id' | 'createdAt' | 'authorId' | 'createdAt' | 'updatedAt' | 'slug'
>;

export type updatePostInput = {
  title?: string;
  content?: string;
  category?: string;
  published?: boolean;
};

export interface findManyPost extends FindMany {
  category?: string;
  title?: string;
  published?: boolean;
}

export type findAllUserPost = Pick<FindMany, 'limit' | 'page'>;

export interface findOneSlug {
  slug: string;
}
