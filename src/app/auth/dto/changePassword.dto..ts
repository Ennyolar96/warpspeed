import { IsNotEmpty, IsString } from 'class-validator';
import { createNewPassword } from '../interface';
import { CreateUserInput } from './create-auth.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MatchValidate } from 'src/global/decorator';

export class CreateNewPassword
  extends CreateUserInput
  implements createNewPassword
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MatchValidate('password')
  confirmPassword: string;
}
