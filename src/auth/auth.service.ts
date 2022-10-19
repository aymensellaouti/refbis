import { BadRequestException, Body, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { User } from "../user/entities/user.entity";
import { LoginResponseDto } from "./dto/login-response.dto";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
  }
  register(registerDto: RegisterDto): Promise<User> {
    return this.userService.create(registerDto);
  }
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const {username, password} = loginDto;
    const user = await this.userService.findUserByUsernameOrEmail(username);
    if (!user) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    const payload: JwtPayloadDto = {
      username: user.username,
      email: user.email,
      role: user.role
    }
    const jwt = this.jwtService.sign(payload);
    return { token: jwt };
  }
}
