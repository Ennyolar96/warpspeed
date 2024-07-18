import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SessionUser } from 'src/global/decorator';
import { UpdateUser } from './dto';
import { AuthUser } from './interface';
import { UserService } from './user.service';
import { FindOneDto } from 'src/global/dto';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  LoggedUser(@SessionUser() user: AuthUser) {
    return this.userService.loggedUser(user);
  }

  @ApiParam({ name: 'id', required: true, type: FindOneDto })
  @ApiBody({ type: UpdateUser })
  @Patch(':id')
  update(@Param() param: FindOneDto, @Body() update: UpdateUser) {
    return this.userService.update(param, update);
  }
}
