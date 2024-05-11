import { ApiOkResponse, ApiQuery } from '@nestjs/swagger'

export const ApiCrypto = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiQuery({ name: 'data', type: 'string' })(_1, _2, _3)
  ApiQuery({ name: 'check', type: 'string' })(_1, _2, _3)

  ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })(_1, _2, _3)
}
