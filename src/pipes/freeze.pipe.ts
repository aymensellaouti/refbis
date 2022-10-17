import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
  transform(objet: any, metadata: ArgumentMetadata) {
    return Object.freeze(objet);
  }
}
