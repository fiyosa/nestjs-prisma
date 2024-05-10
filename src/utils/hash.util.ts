import { Injectable } from '@nestjs/common'
import * as bycrypt from 'bcrypt'
import Hashids from 'hashids'
import { Secret } from '../config/secret'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class HashUtil {
  private readonly hashids: Hashids
  private readonly secret: Secret

  constructor() {
    this.secret = new Secret(new ConfigService())
    this.hashids = new Hashids(this.secret.env.APP_SECRET, 10)
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
