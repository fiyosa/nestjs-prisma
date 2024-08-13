import { ApiOkResponse } from '@nestjs/swagger'

export const ApiGetCaptcha = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
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
