import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  createParamDecorator,
} from '@nestjs/common'
import { DB } from './db'
import { Request, Response } from 'express'
import { HashUtil } from '../utils/hash.util'

@Injectable()
export class Authentication implements NestMiddleware {
  constructor(private readonly db: DB) {}

  async use(req: Request, _: Response, next: (error?: any) => void) {
    try {
      const token = req.headers.authorization as string
      if (token) {
        const user = await this.db.user.findFirst({ where: { token: token.split(' ')[1] || '???' } })
        if (user) req['user'] = user
      }
      next()
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

@Injectable()
export class Authorization {}

export const Auth = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  const user = req['user']
  if (user) return user
  throw new HttpException('Unauthorized', 401)
})

export const ParamID = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const hashids = new HashUtil()
  const req: Request = ctx.switchToHttp().getRequest()
  const id = req.params[data]
  const decodeId = hashids.decode(id)
  if (decodeId !== '') return decodeId
  throw new HttpException('Param ID is wrong', 400)
})
