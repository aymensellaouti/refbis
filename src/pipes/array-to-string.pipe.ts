import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ArrayToStringPipe implements PipeTransform {
  transform(tableau: string[], metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      return tableau.join('-').toUpperCase();
    }
    return tableau;
  }
}
