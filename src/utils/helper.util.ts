import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { HashUtil } from './hash.util'

@Injectable()
export class HelperUtil {
  constructor(private readonly hash: HashUtil) {}

  public exception(err: any, statusCode?: HttpStatus) {
    throw new HttpException(err, statusCode ?? 500)
  }

  public modelToResponse<T>(model: new () => T, data: any): T {
    try {
      const result = new model()
      Object.keys(result).forEach((property) => {
        if (data.hasOwnProperty(property)) {
          if (data[property]) {
            if (property === 'id') result[property] = this.hash.encode(data[property].toString()) || data[property]
            else result[property] = data[property]
          } else {
            if (typeof result[property] === 'string') result[property] = ''
            else if (typeof result[property] === 'number') result[property] = 0
            else result[property] = null
          }
        }
      })
      return result
    } catch (err) {
      return new model()
    }
  }

  public isObj(check: any) {
    return typeof check === 'object' && !Array.isArray(check) && check !== null
  }

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
