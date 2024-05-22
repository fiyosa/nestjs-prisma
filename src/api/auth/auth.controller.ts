import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { WebResModel } from '../../models/web.model'
import { ApiLogin, LoginReqModel, LoginResModel } from '../../models/auth/login.model'
import { ApiRegister, RegisterReqModel, RegisterResModel } from '../../models/auth/register.model'
import { ApiUser, UserResModel } from '../../models/auth/user.model'
import { User } from '@prisma/client'
import { Auth } from '../../config/middleware'
import { ApiLogout, LogoutResModel } from '../../models/auth/logout.model'
import { __ } from '../../lang/lang'
import { ApiTags } from '@nestjs/swagger'
import { ApiCrypto } from '../../models/auth/crypto.model'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiUpload } from '../../models/auth/upload.model'

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(200)
  @ApiRegister()
  async register(@Body() req: RegisterReqModel): Promise<WebResModel<RegisterResModel>> {
    const result = await this.authService.register(req)
    return { data: result, message: __('saved_successfully', { operator: __('user') }) }
  }

  @Post('/login')
  @HttpCode(200)
  @ApiLogin()
  async login(@Body() req: LoginReqModel): Promise<LoginResModel> {
    return await this.authService.login(req)
  }

  @Delete('/logout')
  @HttpCode(200)
  @ApiLogout()
  async logout(@Auth() user: User): Promise<WebResModel<LogoutResModel>> {
    return await this.authService.logout(user)
  }

  @Get('/user')
  @HttpCode(200)
  @ApiUser()
  async show(@Auth() user: User): Promise<WebResModel<UserResModel>> {
    const result = await this.authService.user(user)
    return { data: result, message: __('retrieved_successfully', { operator: __('user') }) }
  }

  @Get('/hash')
  @HttpCode(200)
  @ApiCrypto()
  crypto(@Query() req: { data: string; check: string }): WebResModel<any> {
    const result = this.authService.crypto(req.data, req.check)
    return { data: result, message: __('retrieved_successfully', { operator: 'Hash' }) }
  }

  @Post('/upload')
  @HttpCode(200)
  @ApiUpload()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<any> {
    if (!file) throw new HttpException('File is required', 400)
    return {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
    }
  }
}
