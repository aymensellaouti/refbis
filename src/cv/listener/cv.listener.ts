import { Injectable, Logger } from "@nestjs/common";
import { Cv } from "../entities/cv.entity";
import { OnEvent } from "@nestjs/event-emitter";
import { constantes } from "../../config/constantes.config";

@Injectable()
export class CvListener {
  private logger = new Logger(CvListener.name);
  constructor() {
  }
  @OnEvent(constantes.events.cv.add)
  async logAddedCvListener(payload: Cv) {
    this.logger.log('Added Cv : ');
    console.log(payload);
  }
}
