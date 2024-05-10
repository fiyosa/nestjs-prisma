import { Injectable } from '@nestjs/common'
import { ZodType } from 'zod'

@Injectable()
export class ValidationUtil {
  validate<T>(zodType: ZodType<T>, data: T): T {
    return zodType.parse(data)
  }
}
