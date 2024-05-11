import { ApiBearerAuth, ApiOkResponse, ApiParam } from '@nestjs/swagger'

export const ApiDeleteDelete = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBearerAuth()(_1, _2, _3)

  ApiParam({ name: 'address_id', type: 'string' })(_1, _2, _3)

  ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })(_1, _2, _3)
}
