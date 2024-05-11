import { ApiBody, ApiOkResponse } from '@nestjs/swagger'

export class RegisterReqModel {
  username: string
  password: string
  name: string
}

export class RegisterResModel {
  id: string = ''
  username: string = ''
  name: string = ''
}

export const ApiRegister = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: '' },
        password: { type: 'string', example: '' },
        name: { type: 'string', example: '' },
      },
      required: ['username', 'password'],
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
            username: { type: 'string' },
            name: { type: 'string' },
          },
        },
        message: { type: 'string' },
      },
    },
  })(_1, _2, _3)
}
