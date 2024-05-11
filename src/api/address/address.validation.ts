import { ZodType, zod } from '../../config/zod'

export class AddressValidation {
  public static readonly CREATE: ZodType = zod.object({
    contact_id: zod.string().min(10),
    street: zod.string().min(1).max(255).optional(),
    city: zod.string().min(1).max(255).optional(),
    province: zod.string().min(1).max(255).optional(),
    country: zod.string().min(1).max(255),
    postal_code: zod.string().min(1).max(255),
  })

  public static readonly SHOW: ZodType = zod.object({
    contact_id: zod.string().min(10),
    address_id: zod.string().min(10),
  })

  public static readonly UPDATE: ZodType = zod.object({
    street: zod.string().min(1).max(255).optional(),
    city: zod.string().min(1).max(255).optional(),
    province: zod.string().min(1).max(255).optional(),
    country: zod.string().min(1).max(255),
    postal_code: zod.string().min(1).max(255),
  })
}
