import { Body, Controller, Get, Param, ParseArrayPipe, Post, Res } from "@nestjs/common";
import { AppService } from './app.service';
import { ArrayToStringPipe } from "./pipes/array-to-string.pipe";
import { FreezePipe } from "./pipes/freeze.pipe";
import * as dateMath from 'date-arithmetic';
import * as moment from 'moment';
import { Response } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('public/:folder/:filePath') getFile(
    @Res() res: Response,
    @Param('filePath') path: string,
    @Param('folder') folder: string,
    ) {
    console.log('path', path);
    console.log('path', folder);
    res.sendFile(path, { root: `public/${folder}`});
  }

  @Get()
  getHello(): string {
    const date = new Date;
    // console.log('date', date);
    // console.log('startOf', dateMath.startOf(new Date, 'day'));
    // console.log('startOf', dateMath.startOf(new Date, 'day', 'week'));
    // console.log('startOf', dateMath.startOf(new Date, 'day', 'month'));
    // const newDate = dateMath.add(date, 50, 'day');
    // console.log('newdate', newDate);
    // console.log('moment',moment().startOf('day'));
    // console.log('moment',moment().startOf('day').toDate());
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
