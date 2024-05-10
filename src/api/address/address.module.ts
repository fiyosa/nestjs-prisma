import { Module } from '@nestjs/common'
import { AddressController } from './address.controller'
import { AddressSerive } from './address.service'

@Module({
  controllers: [AddressController],
  providers: [AddressSerive],
})
export class AddressModule {}
