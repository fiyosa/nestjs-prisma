import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { LoggerUtil } from '../../utils/logger.util'
import { DB } from '../../config/db'
import { ValidationUtil } from '../../utils/validation.util'
import { AuthValidation } from './auth.validation'
import { UuidUtil } from '../../utils/uuid.util'
import { RegisterReqModel, RegisterResModel } from '../../models/auth/register.model'
import { LoginReqModel, LoginResModel } from '../../models/auth/login.model'
import { HelperUtil } from '../../utils/helper.util'
import { UserResModel } from '../../models/auth/user.model'
import { User } from '@prisma/client'
import { HashUtil } from '../../utils/hash.util'
import { LogoutResModel } from '../../models/auth/logout.model'

@Injectable()
export class AuthService {
  constructor(
    private readonly helper: HelperUtil,
    private readonly logger: LoggerUtil,
    private readonly validation: ValidationUtil,
    private readonly authValidation: AuthValidation,
    private readonly db: DB,
    private readonly hash: HashUtil,
    private readonly uuid: UuidUtil
  ) {}

  async register(req: RegisterReqModel): Promise<RegisterResModel> {
    try {
      const validated: RegisterReqModel = this.validation.validate(this.authValidation.REGISTER, req)

      const userCount = await this.db.user.count({
        where: { username: validated.username },
        // where: { id: -1 },
      })

      if (userCount !== 0) throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST)

      validated.password = this.hash.create(validated.password)

      const user = await this.db.user.create({
        data: validated,
      })

      return {
        username: user.username,
        name: user.name,
      }
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async login(req: LoginReqModel): Promise<LoginResModel> {
    try {
      const validated: LoginReqModel = this.validation.validate(AuthValidation.LOGIN, req)

      let user = await this.db.user.findUnique({
        where: { username: validated.username },
      })

      if (!user) this.helper.exception('Username or password is invalid', HttpStatus.BAD_REQUEST)

      const isPasswordValid = this.hash.verify(validated.password, user.password)

      if (!isPasswordValid) this.helper.exception('Username or password is invalid', HttpStatus.BAD_REQUEST)

      user = await this.db.user.update({
        where: { id: user.id },
        data: { token: this.uuid.get() },
      })

      this.logger.info(`Login -> ${this.helper.objToStr({ id: user.id })}`)

      return {
        token: user.token,
      }
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async logout(user: User): Promise<LogoutResModel> {
    try {
      await this.db.user.update({
        where: { id: user.id },
        data: { token: null },
      })

      return {
        message: 'Logout successfully',
      }
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async user(user: User): Promise<UserResModel> {
    return {
      id: this.hash.encode(user.id.toString()),
      username: user.username,
      name: user.name,
    }
  }

  async crypto(data: string, check: string) {
    return {
      raw_data: data,
      bcrypt: this.hash.create(data),
      verify: this.hash.verify(check, data),
      encode: this.hash.encode(data),
      decode: this.hash.decode(data),
    }
  }
}
