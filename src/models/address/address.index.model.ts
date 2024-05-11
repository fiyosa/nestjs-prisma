import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger'

export class AddressIndexQueryModel {
  contact_id: string
}

export class AddressIndexResModel {
  id: string = ''
  street: string = ''
  city: string = ''
  province: string = ''
  country: string = ''
  postal_code: string = ''
}

export const ApiAddressIndex = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBearerAuth()(_1, _2, _3)

  ApiQuery({ name: 'contact_id', type: 'string' })(_1, _2, _3)

  ApiOkResponse({
    schema: {
      type: 'array',
      items: {
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
    },
  })(_1, _2, _3)
}
