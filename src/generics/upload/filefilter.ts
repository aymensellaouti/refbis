import { Request } from "express";
import { BadRequestException } from "@nestjs/common";

export const fileFilter = (req: Request, file: Express.Multer.File, callback) => {
  console.log('mimetype',file.originalname);
  if (file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/) ) {
    callback(null, true);
  } else {
    return callback(new BadRequestException('Only image files are allowed!'),false);
  }
}
