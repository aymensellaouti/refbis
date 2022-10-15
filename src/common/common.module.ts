import { Global, Module } from "@nestjs/common";
import { v4 as uuid} from 'uuid';

const uuidProvider = {
  useValue: uuid,
  provide: 'UUID'
};

@Module({
  providers: [
    uuidProvider
  ],
  exports: [
    uuidProvider
  ]
})
@Global()
export class CommonModule {}
