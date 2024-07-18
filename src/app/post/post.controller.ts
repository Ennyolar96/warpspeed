import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { AuthUser } from '@app/user/interface';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SessionUser } from 'src/global/decorator';
import {
  CreatePostInput,
  FindAllUserPost,
  FindManyPost,
  FindOneSlug,
  UpdatePostInput,
} from './dto';
import { PostService } from './post.service';
import { FindOneDto } from 'src/global/dto';

@ApiTags('Post')
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiBody({ type: CreatePostInput })
  async CreateNewPost(
    @Body() create: CreatePostInput,
    @SessionUser() user: AuthUser,
  ) {
    return this.postService.CreatePost(user, create);
  }

  @Get(':slug')
  @ApiParam({ name: 'slug', required: true, type: FindOneSlug })
  async FindSinglePost(@Param() param: FindOneSlug) {
    return this.postService.FindSinglePost(param);
  }

  @Get()
  @ApiQuery({ type: FindManyPost })
  async FindManyPost(@Query() query: FindManyPost) {
    return this.postService.FindManyPost(query);
  }

  @Get('user')
  @ApiQuery({ type: FindAllUserPost })
  async FindLoggedUserPost(
    @Query() query: FindAllUserPost,
    @SessionUser() user: AuthUser,
  ) {
    return this.postService.FindAllUserPost(query, user);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePostInput })
  @ApiParam({ name: 'id', required: true, type: FindOneDto })
  async UpdatePost(
    @Body() update: UpdatePostInput,
    @Param() param: FindOneDto,
    @SessionUser() user: AuthUser,
  ) {
    return this.postService.Update(user, param, update);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, type: FindOneDto })
  async DeletePost(@Param() param: FindOneDto, @SessionUser() user: AuthUser) {
    return this.postService.DeletePost(user, param);
  }
}
