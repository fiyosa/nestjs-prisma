import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger'

export class ContactUpdateReqModel {
  first_name: string
  last_name?: string
  email?: string
  phone?: string
}

export class ContactUpdateResModel {
  id: string = ''
  first_name: string = ''
  last_name: string = ''
  email: string = ''
  phone: string = ''
}

export const ApiContactUpdate = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBearerAuth()(_1, _2, _3)

  ApiParam({ name: 'contact_id', type: 'string' })(_1, _2, _3)

  ApiBody({
    schema: {
      type: 'object',
      properties: {
        first_name: { type: 'string', example: '' },
        last_name: { type: 'string', example: '' },
        email: { type: 'string', example: '' },
        phone: { type: 'string', example: '' },
      },
      required: ['user_id', 'first_name'],
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
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
          },
        },
        message: { type: 'string' },
      },
    },
  })(_1, _2, _3)
}
