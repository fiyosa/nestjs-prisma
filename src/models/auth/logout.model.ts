import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger'

export class LogoutResModel {
  message: string = ''
}

export const ApiLogout = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBearerAuth()(_1, _2, _3)

  ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })(_1, _2, _3)
}
