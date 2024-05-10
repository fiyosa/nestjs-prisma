import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { DB } from './db'
import { Secret } from './secret'
import { Authentication, Authorization } from './middleware'

@Global()
@Module({
  providers: [Secret, DB, Authentication, Authorization],
  exports: [Secret, DB, Authentication, Authorization],
})
export class ConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authentication).forRoutes('/*')
  }
}
