import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { WebResModel } from '../../models/web.model'
import { LoginReqModel, LoginResModel } from '../../models/auth/login.model'
import { RegisterReqModel, RegisterResModel } from '../../models/auth/register.model'
import { UserResModel } from '../../models/auth/user.model'
import { User } from '@prisma/client'
import { Auth } from '../../config/middleware'
import { LogoutResModel } from '../../models/auth/logout.model'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(200)
  async register(@Body() req: RegisterReqModel): Promise<WebResModel<RegisterResModel>> {
    const result = await this.authService.register(req)
    return { data: result, message: 'User saved successfully' }
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() req: LoginReqModel): Promise<WebResModel<LoginResModel>> {
    const result = await this.authService.login(req)
    return { data: result }
  }

  @Delete('/logout')
  @HttpCode(200)
  async logout(@Auth() user: User): Promise<WebResModel<LogoutResModel>> {
    const result = await this.authService.logout(user)
    return { message: result.message }
  }

  @Get('/user')
  @HttpCode(200)
  async show(@Auth() user: User): Promise<WebResModel<UserResModel>> {
    const result = await this.authService.user(user)
    return { data: result }
  }

  @Get('/hash')
  @HttpCode(200)
  async crypto(@Body() req: { data: string; check: string }): Promise<WebResModel<any>> {
    const result = await this.authService.crypto(req.data, req.check)
    return { data: result, message: 'Hash retrieved successfully' }
  }
}
