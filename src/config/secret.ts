import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()

const secret = {
  NODE_ENV: configService.get<string>('NODE_ENV', 'development'),
  APP_PORT: configService.get<string>('APP_PORT', '4000'),
  APP_SECRET: configService.get<string>('APP_SECRET', 'nestjs-prisma'),
  APP_LOCALE: configService.get<string>('APP_LOCALE', 'id'),
}

export { secret }
