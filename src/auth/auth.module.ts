import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtAuthStrategy } from "./strategy/jwt-auth.strategy";
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('auth.secret'),
        signOptions: {
          expiresIn: config.get('auth.expire'),
        }
      }),
      inject: [ConfigService]
    }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    UserModule
  ]
})
export class AuthModule {}
