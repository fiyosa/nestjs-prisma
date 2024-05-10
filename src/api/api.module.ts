import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { AddressModule } from './address/address.module'
import { ContactModule } from './contact/contact.module'

@Module({
  imports: [AuthModule, UserModule, ContactModule, AddressModule],
})
export class ApiModule {}
