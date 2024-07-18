import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/global/decorator';
import { AuthService } from './auth.service';
import { CreateNewPassword, CreateUserInput, LoginInput } from './dto';

@Public()
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserInput })
  @Post('register')
  Register(@Body() createAuthDto: CreateUserInput) {
    return this.authService.register(createAuthDto);
  }

  @ApiBody({ type: LoginInput })
  @Post('login')
  Login(@Body() data: LoginInput) {
    return this.authService.login(data);
  }

  @ApiBody({ type: CreateNewPassword })
  @Post('reset-password')
  changePassword(@Body() changePassword: CreateNewPassword) {
    return this.authService.changePassword(changePassword);
  }
}
