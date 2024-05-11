import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthValidation } from './auth.validation'

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthValidation],
})
export class AuthModule {}
