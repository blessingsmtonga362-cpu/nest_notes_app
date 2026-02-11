import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './auth.constant';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UsersModule,JwtModule.register({
    secret:jwtConstants.secret,
    global:true,
    signOptions:{expiresIn:'60m'}
}),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
