import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger'

export class UploadReqModel {
  username: string
  password: string
}

export class UploadResModel {
  token: string = ''
}

export const ApiUpload = () => (_1: any, _2: string, _3: PropertyDescriptor) => {
  ApiConsumes('multipart/form-data')(_1, _2, _3)

  ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: [],
    },
  })(_1, _2, _3)

  ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        fieldname: { type: 'string' },
        originalname: { type: 'string' },
        encoding: { type: 'string' },
        mimetype: { type: 'string' },
        size: { type: 'number' },
      },
    },
  })(_1, _2, _3)
}
