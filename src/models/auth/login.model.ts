import { ApiBody, ApiOkResponse } from '@nestjs/swagger'

export class LoginReqModel {
  username: string
  password: string
}

export class LoginResModel {
  token: string = ''
}

export const ApiLogin = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: '' },
        password: { type: 'string', example: '' },
      },
      required: ['username', 'password'],
    },
  })(_1, _2, _3)

  ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  })(_1, _2, _3)
}
