import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';
import { update } from '../interface/user.interface';

export class UpdateUser implements update {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  lastName: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({ type: String })
  avatar: string;
}
