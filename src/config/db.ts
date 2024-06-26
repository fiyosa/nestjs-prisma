import { Injectable, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { LoggerUtil } from '../utils/logger.util'
import { secret } from './secret'

@Injectable()
export class DB extends PrismaClient<Prisma.PrismaClientOptions, string> implements OnModuleInit {
  constructor(private readonly logger: LoggerUtil) {
    super({
      log: [
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'query' },
      ],
    })
  }

  async onModuleInit() {
    // this.$on('info', (e) => this.logger.info(e.message))
    // this.$on('query', (e) => this.logger.info(e.query))
    this.$on('warn', (e) => {
      if (secret.NODE_ENV === 'development' || secret.NODE_ENV === 'test') {
        this.logger.warn(e.message)
      }
    })
    this.$on('error', (e) => {
      if (secret.NODE_ENV === 'development' || secret.NODE_ENV === 'test') {
        this.logger.error(e.message)
      }
    })
  }
}
