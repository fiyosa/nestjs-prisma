import { ZodType, z } from 'zod'

export class AddressValidation {
  public static readonly CREATE: ZodType = z.object({
    contact_id: z.string().min(10),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(255).optional(),
    province: z.string().min(1).max(255).optional(),
    country: z.string().min(1).max(255),
    postal_code: z.string().min(1).max(255),
  })

  public static readonly SHOW: ZodType = z.object({
    contact_id: z.string().min(10),
    address_id: z.string().min(10),
  })

  public static readonly UPDATE: ZodType = z.object({
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(255).optional(),
    province: z.string().min(1).max(255).optional(),
    country: z.string().min(1).max(255),
    postal_code: z.string().min(1).max(255),
  })
}
