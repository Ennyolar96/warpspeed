import { AuthModule } from '@app/auth/auth.module';
import { PostModule } from '@app/post/post.module';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { GlobalNestModule } from './global/global.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './global/guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    AuthModule,
    UserModule,
    GlobalNestModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
