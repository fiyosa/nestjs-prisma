import { ZodType, zod } from '../../config/zod'

export class AuthValidation {
  public readonly REGISTER: ZodType = zod.object({
    username: zod.string().min(1).max(100),
    password: zod.string().min(1).max(100),
    name: zod.string().min(1).max(100),
  })

  public static readonly LOGIN: ZodType = zod.object({
    username: zod.string().min(1).max(100),
    password: zod.string().min(1).max(100),
  })
}
