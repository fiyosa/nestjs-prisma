import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger'

export class ContactIndexQueryModel {
  name?: string
  email?: string
  phone?: string

  page: number
  limit: number
}

export class ContactIndexResModel {
  id: string = ''
  first_name: string = ''
  last_name: string = ''
  email: string = ''
  phone: string = ''
}

export const ApiContactIndex = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBearerAuth()(_1, _2, _3)

  ApiQuery({ name: 'name', type: 'string', required: false })(_1, _2, _3)
  ApiQuery({ name: 'email', type: 'string', required: false })(_1, _2, _3)
  ApiQuery({ name: 'phone', type: 'string', required: false })(_1, _2, _3)
  ApiQuery({ name: 'page', type: 'number' })(_1, _2, _3)
  ApiQuery({ name: 'limit', type: 'number' })(_1, _2, _3)

  ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
        },
      },
    },
  })(_1, _2, _3)
}
