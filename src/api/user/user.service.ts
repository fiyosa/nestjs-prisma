import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserUpdateReqModel, UserUpdateResModel } from '../../models/user/user.update.model'
import { DB } from '../../config/db'
import { HashUtil } from '../../utils/hash.util'
import { LoggerUtil } from '../../utils/logger.util'
import { ValidationUtil } from '../../utils/validation.util'
import { UserValidation } from './user.validation'
import { HelperUtil } from '../../utils/helper.util'

@Injectable()
export class UserService {
  constructor(
    private readonly helper: HelperUtil,
    private readonly logger: LoggerUtil,
    private readonly validation: ValidationUtil,
    private readonly db: DB,
    private readonly hash: HashUtil
  ) {}

  async update(user: User, user_id: number, req: UserUpdateReqModel): Promise<UserUpdateResModel> {
    const validated: UserUpdateReqModel = this.validation.validate(UserValidation.UPDATE, req)

    user = {
      ...user,
      ...(validated.name && { name: validated.name }),
      ...(validated.password && { password: this.hash.create(validated.password) }),
    }

    const result = await this.db.user.update({
      where: { id: user_id },
      data: user,
    })

    return {
      id: this.hash.encode(result.id.toString()),
      username: result.username,
      name: result.name,
    }
  }
}
