import { ApiBearerAuth, ApiOkResponse, ApiParam } from '@nestjs/swagger'

export class AddressShowResModel {
  id: string = ''
  street: string = ''
  city: string = ''
  province: string = ''
  country: string = ''
  postal_code: string = ''
}

export const ApiAddressShow = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBearerAuth()(_1, _2, _3)

  ApiParam({ name: 'address_id', type: 'string' })(_1, _2, _3)

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
