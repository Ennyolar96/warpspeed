import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/global/service';
import { CreateUserInput } from './dto/create-auth.dto';
import { createNewPassword, loginInput } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private ORM: PrismaService,
    private JWT: JwtService,
  ) {}
  async register(user: CreateUserInput): Promise<User> {
    try {
      const hash = await argon.hash(user.password);
      const data = { ...user, password: hash };

      const save = await this.ORM.user.create({ data });

      delete save.password;

      return save;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(['Credentials Taken']);
        }
      }
      throw error;
    }
  }

  async login(user: loginInput) {
    const { username, password } = user;
    try {
      const findOne = await this.ORM.user.findUnique({
        where: { username },
      });

      if (!findOne) {
        throw new ForbiddenException(['Incorrect username, try agin']);
      }

      const MP = await argon.verify(findOne.password, password);
      if (!MP) {
        throw new ForbiddenException(['Incorrect password, try again ']);
      }

      delete findOne.password;

      return {
        ...findOne,
        token: await this.Authorize(findOne.id, findOne.email),
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(input: createNewPassword): Promise<User> {
    const { email, password } = input;
    try {
      const findOne = await this.ORM.user.findUnique({
        where: { email },
      });

      if (!findOne) {
        throw new ForbiddenException(['User not found']);
      }

      const hash = await argon.hash(password);

      const save = await this.ORM.user.update({
        where: { id: findOne.id },
        data: {
          password: hash,
        },
      });

      delete save.password;

      return save;
    } catch (error) {
      throw error;
    }
  }

  async Authorize(userId: string | number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.JWT.signAsync(payload);
    return token;
  }
}
