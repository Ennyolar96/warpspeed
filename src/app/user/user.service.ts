import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/global/service';
import { AuthUser, update } from './interface';
import { FindOne } from 'src/global/interface';

@Injectable()
export class UserService {
  constructor(private ORM: PrismaService) {}

  async loggedUser(user: AuthUser): Promise<User> {
    return user;
  }

  async update(param: FindOne, input: update): Promise<User> {
    try {
      const find = await this.ORM.user.findUnique({ where: { id: param.id } });

      if (!find) new ForbiddenException(['User not found']);

      return await this.ORM.user.update({
        where: { id: find.id },
        data: input,
      });
    } catch (error) {
      throw error;
    }
  }
}
