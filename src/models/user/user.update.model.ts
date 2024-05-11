import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger'
import { UserResModel } from '../auth/user.model'

export class UserUpdateReqModel {
  name?: string
  password?: string
}

export class UserUpdateResModel extends UserResModel {}

export const ApiUserUpdate = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiBearerAuth()(_1, _2, _3)

  ApiParam({ name: 'user_id', type: 'string' })(_1, _2, _3)

  ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string', example: '' },
        name: { type: 'string', example: '' },
      },
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
