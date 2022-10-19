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
  ParseFilePipe, MaxFileSizeValidator
} from "@nestjs/common";
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, Multer } from "multer";
import { filename } from "../generics/upload/filename";
import { fileFilter } from "../generics/upload/filefilter";

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
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
    })) file: Express.Multer.File
  ) {
    // console.log(file);
    createCvDto.path = 'uploads/' + file.filename;
    return this.cvService.create(createCvDto);
  }

  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }
}
