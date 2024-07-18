import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { FindMany, FindOne, FindSingleBlog } from '../interface';

export class FindManyDto implements FindMany {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ type: Number })
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @Max(100)
  @ApiPropertyOptional({ type: Number })
  limit?: number = 30;

  @IsOptional()
  @IsString({ each: true })
  @ApiPropertyOptional({ type: [String] })
  sort?: string[];

  @IsOptional()
  @ApiPropertyOptional()
  include?: string[];
}

export class FindOneDto implements FindOne {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: string;
}

export class FindSingleBlogDto implements FindSingleBlog {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  slug: string;
}
