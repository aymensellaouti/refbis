import { Request } from "express";
import {v4 as uuid} from 'uuid';
export const filename = (
  req: Request,
  file: Express.Multer.File,
  callback) => {
  const newFilename = uuid()+file.originalname.replace(/\s/g, "");
  callback(null, newFilename);
}
