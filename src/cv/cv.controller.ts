import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe, MaxFileSizeValidator, UseGuards
} from "@nestjs/common";
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, Multer } from "multer";
import { filename } from "../generics/upload/filename";
import { fileFilter } from "../generics/upload/filefilter";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "../auth/guards/admin.guard";
import { GetUser } from "../generics/decorators/get-user.decoratore";
import { User } from "../user/entities/user.entity";
import { HasRole } from "../generics/decorators/has-role.decorator";
import { RoleGuard } from "../auth/guards/role.guard";

@Controller('cv')
@HasRole('admin')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @HasRole('admin')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/uploads',
      filename: filename
    }),
    fileFilter: fileFilter
  }))
  create(
    @Body() createCvDto: CreateCvDto,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 1048576
        })
      ]
    })) file: Express.Multer.File,
    @GetUser() user: User
  ) {
    // console.log(file);
    createCvDto.user = user;
    createCvDto.path = 'uploads/' + file.filename;
    return this.cvService.create(createCvDto);
  }

  @Get()
  @HasRole('user')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  findAll(@GetUser() user: User) {
    console.log('user in getAll', user);
    return this.cvService.findAll(user);
  }

  @Get(':id')
  @HasRole('user')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  remove(@Param('id') id: string) {
    console.log('delete');
    return this.cvService.remove(+id);
  }
}

