import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger'

export class AddressCreateReqModel {
  contact_id: string
  street?: string
  city?: string
  province?: string
  country: string
  postal_code: string
}

export class AddressCreateResModel {
  id: string = ''
  street: string = ''
  city: string = ''
  province: string = ''
  country: string = ''
  postal_code: string = ''
}

export const ApiAddressCreate = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBearerAuth()(_1, _2, _3)

  ApiBody({
    schema: {
      type: 'object',
      properties: {
        contact_id: { type: 'string' },
        street: { type: 'string' },
        city: { type: 'string' },
        province: { type: 'string' },
        country: { type: 'string' },
        postal_code: { type: 'string' },
      },
      required: ['country', 'postal_code'],
    },
  })(_1, _2, _3)

  ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            street: { type: 'string' },
            city: { type: 'string' },
            province: { type: 'string' },
            country: { type: 'string' },
            postal_code: { type: 'string' },
          },
        },
        message: { type: 'string' },
      },
    },
  })(_1, _2, _3)
}
