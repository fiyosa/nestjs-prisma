import { Injectable } from '@nestjs/common'
import * as bycrypt from 'bcrypt'
import Hashids from 'hashids'
import { secret } from '../config/secret'

@Injectable()
export class HashUtil {
  private readonly hashids: Hashids

  constructor() {
    this.hashids = new Hashids(secret.APP_SECRET, 10)
  }

  create(data: string): string {
    return bycrypt.hashSync(data, 10)
  }

  verify(check: string, encrypted: string): boolean {
    return bycrypt.compareSync(check, encrypted)
  }

  encode(data: string | number): string {
    return this.hashids.encode(data.toString())
  }

  decode(data: string): string {
    try {
      return this.hashids.decode(data)[0].toString()
    } catch (err) {
      return ''
    }
  }
}
