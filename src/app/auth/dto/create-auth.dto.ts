import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { createUser, loginInput } from '../interface';

export class CreateUserInput implements createUser {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty()
  username: string;
}

export class LoginInput implements loginInput {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @ApiProperty({ type: String })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;
}
