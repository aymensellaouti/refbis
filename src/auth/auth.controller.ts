import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { User } from "../user/entities/user.entity";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post('login')
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<User> {
    return this.authService.login(loginDto);
  }
}
