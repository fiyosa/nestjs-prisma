import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ValidationUtil } from './validation.util'
import { LoggerUtil } from './logger.util'
import { APP_FILTER } from '@nestjs/core'
import { ErrorUtil } from './error.util'
import { UuidUtil } from './uuid.util'
import { HelperUtil } from './helper.util'
import { HashUtil } from './hash.util'

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LoggerUtil.SETUP],
  providers: [{ provide: APP_FILTER, useClass: ErrorUtil }, LoggerUtil, ValidationUtil, HashUtil, UuidUtil, HelperUtil],
  exports: [ValidationUtil, HashUtil, LoggerUtil, UuidUtil, HelperUtil],
})
export class UtilModule {}
