import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";
import { UserService } from "../../user/user.service";
import { instanceToInstance, TransformInstanceToInstance } from "class-transformer";
import { UpdateCvDto } from "../../cv/dto/update-cv.dto";
import { UpdateUserDto } from "../../user/dto/update-user.dto";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret')
    });
  }

  async validate(payload: JwtPayloadDto) {
    const { username } = payload;
    console.log('in validate with this payload', payload);
    const user = await this.userService.findUserByUsernameOrEmail(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
