import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  createPostInput,
  findAllUserPost,
  findManyPost,
  findOneSlug,
  updatePostInput,
} from '../interface';
import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { FindManyDto } from 'src/global/dto';

export class CreatePostInput implements createPostInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  content: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  published: boolean;
}

export class UpdatePostInput
  extends PartialType(CreatePostInput)
  implements updatePostInput {}

export class FindManyPost extends FindManyDto implements findManyPost {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ type: String })
  category: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ type: Boolean })
  published: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ type: String })
  title: string;
}

export class FindOneSlug implements findOneSlug {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  slug: string;
}

export class FindAllUserPost
  extends PickType(FindManyDto, ['limit', 'page'] as const)
  implements findAllUserPost {}
