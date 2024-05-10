import { Body, Controller, HttpCode, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth, ParamID } from '../../config/middleware'
import { User } from '@prisma/client'
import { UserUpdateReqModel, UserUpdateResModel } from '../../models/user/user.update.model'
import { WebResModel } from '../../models/web.model'

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/:user_id')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @ParamID('user_id') user_id: number,
    @Body() req: UserUpdateReqModel
  ): Promise<WebResModel<UserUpdateResModel>> {
    const result = await this.userService.update(user, user_id, req)
    return {
      data: result,
    }
  }
}
