import { ZodType, zod } from '../../config/zod'

export class UserValidation {
  public static readonly UPDATE: ZodType = zod.object({
    password: zod.string().min(1).max(100).optional(),
    name: zod.string().min(1).max(100).optional(),
  })
}
