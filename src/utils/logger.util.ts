import { Inject, Injectable } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { secret } from '../config/secret'

@Injectable()
export class LoggerUtil {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: winston.Logger) {}

  public static SETUP = WinstonModule.forRoot({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf((info) => `${info.timestamp} ${info.level} : ${info.message}`)
        ),
      }),
      new winston.transports.File({
        filename: 'logs/nest.log',
        format: winston.format.combine(
          winston.format.printf((info) => `${info.timestamp} ${info.level} : ${info.message}`)
        ),
      }),
    ],
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
    exitOnError: false,
  })

  info(msg: string): void {
    if (secret.NODE_ENV === 'development') this.logger.info(msg)
  }

  warn(msg: string): void {
    if (secret.NODE_ENV === 'development') this.logger.warn(msg)
  }

  error(msg: string): void {
    if (secret.NODE_ENV === 'development') this.logger.error(msg)
  }
}
