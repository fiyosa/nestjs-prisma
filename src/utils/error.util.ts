import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ZodError } from 'zod'
import { HelperUtil } from './helper.util'
import { LoggerUtil } from './logger.util'
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Catch(ZodError, HttpException)
export class ErrorUtil implements ExceptionFilter {
  constructor(
    private readonly helper: HelperUtil,
    private readonly logger: LoggerUtil
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const res: Response = host.switchToHttp().getResponse()

    if (exception instanceof HttpException) {
      let err: any = exception.getResponse()
      this.getException(err, res, exception)
    } else {
      this.getException(exception, res, exception)
    }
  }

  private getException(err: any, res: Response, exception: any) {
    if (this.apiNotFound(err)) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'API Not Found' })
      return
    }

    if (this.dbError(err, res)) return

    if (err instanceof ZodError) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ errors: err.issues, message: err.issues[0]?.path[0] + ': ' + err.issues[0].message })
      return
    }

    res.status(exception?.response?.status ?? exception.getStatus() ?? 500).json({
      message: exception?.message ?? err ?? 'Internal server error',
      // test: err,
    })
  }

  private apiNotFound(err: any) {
    return typeof err === 'object' &&
      err !== null &&
      err?.statusCode === 404 &&
      err?.error === 'Not Found' &&
      String(err?.message).includes('Cannot ')
      ? true
      : false
  }

  private dbError(err: any, res: Response) {
    if (err instanceof PrismaClientInitializationError) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Cannot connect to database' })
      return true
    }

    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2003') {
      res.status(HttpStatus.BAD_REQUEST).json({ message: `${err.meta?.modelName} already exist` })
      return true
    }

    return false
  }
}
