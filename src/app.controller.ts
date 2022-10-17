import { Body, Controller, Get, ParseArrayPipe, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { ArrayToStringPipe } from "./pipes/array-to-string.pipe";
import { FreezePipe } from "./pipes/freeze.pipe";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('skills')
  getSkills(@Body('skills',
    new ParseArrayPipe({items: String}),
    ArrayToStringPipe
  ) skills) {
    return skills;
  }
  @Post('freeze')
  postObject(@Body(FreezePipe) skills) {
    // skills.newValue = 'cc';
    return skills;
  }
}
