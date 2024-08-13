import { ApiBody, ApiOkResponse } from '@nestjs/swagger'

export class VerifyCaptchaReqModel {
  hash: string
  token: string
}

export const ApiVerifyCaptcha = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        hash: { type: 'string', example: '' },
        token: { type: 'string', example: '' },
      },
      required: ['username', 'password'],
    },
  })(_1, _2, _3)

  ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })(_1, _2, _3)
}
