import { ZodType, z } from 'zod'

export class ContactValidation {
  public static readonly CREATE: ZodType = z.object({
    user_id: z.string().min(10),
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).email().optional(),
    phone: z.string().min(1).max(20).optional(),
  })

  public static readonly UPDATE: ZodType = z.object({
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).email().optional(),
    phone: z.string().min(1).max(20).optional(),
  })

  public static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).optional(),
    phone: z.string().min(1).max(100).optional(),
    page: z.number().min(1).positive(),
    limit: z.number().min(1).max(100).positive(),
  })
}
