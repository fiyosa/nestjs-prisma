import { ZodType, z } from 'zod'

export class UserValidation {
  public static readonly UPDATE: ZodType = z.object({
    password: z.string().min(1).max(100).optional(),
    name: z.string().min(1).max(100).optional(),
  })
}
