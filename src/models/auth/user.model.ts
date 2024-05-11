import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger'

export class UserResModel {
  id: string = ''
  username: string = ''
  name: string = ''
}

export const ApiUser = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBearerAuth()(_1, _2, _3)

  ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            name: { type: 'string' },
          },
        },
        message: { type: 'string' },
      },
    },
  })(_1, _2, _3)
}
