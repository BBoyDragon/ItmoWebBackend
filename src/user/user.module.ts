import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthGuard } from '../auth/auth.guard';
@Global()
@Module({
  controllers: [UserController],
  providers: [UserService,AuthGuard],
  exports: [UserService],
})
export class UserModule {}
