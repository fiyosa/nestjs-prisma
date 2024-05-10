import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Secret } from '../config/secret'
// import { LangModel } from '../lang/lang.model'

@Injectable()
export class HelperUtil {
  constructor(private readonly secret: Secret) {}

  public exception(err: any, statusCode?: HttpStatus) {
    throw new HttpException(err, statusCode ?? 501)
  }

  public modelToResponse<T>(model: new () => T, data: any): T {
    try {
      const result = new model()
      Object.keys(result).forEach((property) => {
        if (data.hasOwnProperty(property)) {
          if (data[property]) {
            result[property] = data[property]
          } else {
            if (typeof result[property] === 'string') {
              result[property] = ''
            } else if (typeof result[property] === 'number') {
              result[property] = 0
            } else {
              result[property] = null
            }
          }
        }
      })
      return result
    } catch (err) {
      return new model()
    }
  }

  // public __(msg: keyof LangModel, args?: any) {
  //   let newMsg: string = lang[lang]

  //   if (this.isObject(args)) {
  //     Object.keys(args).forEach((arg: string) => {
  //       newMsg = newMsg.replace(':' + arg, args[arg])
  //     })
  //     return newMsg
  //   }

  //   return newMsg
  // }

  public isStrToObj(check: string) {
    try {
      JSON.parse(check)
      return true
    } catch (err) {
      return false
    }
  }

  public objToStr(obj: any) {
    return JSON.stringify(obj, (_, value) => (typeof value === 'bigint' ? value.toString() : value))
  }

  public strToObj(str: any) {
    if (this.isStrToObj(str)) {
      return {
        result: JSON.parse(str),
        status: true,
      }
    }
    return {
      result: null,
      status: false,
    }
  }
}
