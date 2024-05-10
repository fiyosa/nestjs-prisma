import { Module } from '@nestjs/common'
import { UtilModule } from './utils/util.module'
import { ApiModule } from './api/api.module'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [ConfigModule, UtilModule, ApiModule],
})
export class AppModule {}
