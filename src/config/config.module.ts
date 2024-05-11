import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { DB } from './db'
import { Authentication, Authorization } from './middleware'

@Global()
@Module({
  providers: [DB, Authentication, Authorization],
  exports: [DB, Authentication, Authorization],
})
export class ConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authentication).forRoutes('/*')
  }
}
