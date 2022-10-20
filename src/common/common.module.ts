import { CacheModule, Global, Module } from "@nestjs/common";
import { v4 as uuid} from 'uuid';
import { CronService } from "../generics/services/cron/cron.service";

const uuidProvider = {
  useValue: uuid,
  provide: 'UUID'
};

@Module({
  providers: [
    uuidProvider,
    CronService
  ],
  imports: [
    CacheModule.register({
      ttl: 0
    })
  ],
  exports: [
    uuidProvider,
    CacheModule,
    CronService
  ]
})
@Global()
export class CommonModule {}
