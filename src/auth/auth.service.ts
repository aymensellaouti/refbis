import { BadRequestException, Body, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { User } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
  }
  register(registerDto: RegisterDto): Promise<User> {
    return this.userService.create(registerDto);
  }
  async login(loginDto: LoginDto): Promise<User> {
    const {username, password} = loginDto;
    const user = await this.userService.findUserByUsernameOrEmail(username);
    if (!user) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
      throw new UnauthorizedException('Veuillez vérifier vos credentials');
    }
    delete user.password;
    return user;
  }
}
