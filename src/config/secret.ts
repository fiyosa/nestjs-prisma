import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class Secret {
  constructor(private readonly configService: ConfigService) {}

  public env = {
    NODE_ENV: this.configService.get<string>('NODE_ENV', 'development'),
    APP_PORT: this.configService.get<string>('APP_PORT', '4000'),
    APP_SECRET: this.configService.get<string>('APP_SECRET', 'nestjs-prisma'),
  }
}
