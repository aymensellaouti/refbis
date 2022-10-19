import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { GenericCrudService } from "../generics/services/generic-crud.service";
import { RegisterDto } from "../auth/dto/register.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService extends GenericCrudService<User>{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
    super(userRepository);
  }

  findUserByUsernameOrEmail(search: string): Promise<User> {
    return this.userRepository.findOne({
      where: [{username: search}, {email: search} ]
    });
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const user = this.userRepository.create(registerDto);
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    let newUser;
    try {
      newUser = await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(
        'le username et le email doivent être unique',
      );
    }
    delete newUser.password;
    return newUser;
  }
}
