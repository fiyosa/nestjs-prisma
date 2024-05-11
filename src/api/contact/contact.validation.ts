import { ZodType, zod } from '../../config/zod'

export class ContactValidation {
  public static readonly CREATE: ZodType = zod.object({
    user_id: zod.string().min(10),
    first_name: zod.string().min(1).max(100),
    last_name: zod.string().min(1).max(100).optional(),
    email: zod.string().min(1).max(100).email().optional(),
    phone: zod.string().min(1).max(20).optional(),
  })

  public static readonly UPDATE: ZodType = zod.object({
    first_name: zod.string().min(1).max(100),
    last_name: zod.string().min(1).max(100).optional(),
    email: zod.string().min(1).max(100).email().optional(),
    phone: zod.string().min(1).max(20).optional(),
  })

  public static readonly SEARCH: ZodType = zod.object({
    name: zod.string().min(1).max(100).optional(),
    email: zod.string().min(1).max(100).optional(),
    phone: zod.string().min(1).max(100).optional(),
    page: zod.number().min(1).positive(),
    limit: zod.number().min(1).max(100).positive(),
  })
}
