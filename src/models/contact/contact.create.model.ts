import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger'

export class ContactCreateReqModel {
  user_id: string
  first_name: string
  last_name?: string
  email?: string
  phone?: string
}

export class ContactCreateResModel {
  id: string = ''
  first_name: string = ''
  last_name: string = ''
  email: string = ''
  phone: string = ''
}

export const ApiContactCreate = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBearerAuth()(_1, _2, _3)

  ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', example: '' },
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
