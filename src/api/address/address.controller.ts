import { Body, Controller, Delete, Get, HttpCode, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { AddressSerive } from './address.service'
import { Auth, ParamID } from '../../config/middleware'
import { User } from '@prisma/client'
import { AddressCreateReqModel, AddressCreateResModel } from '../../models/address/address.create.model'
import { WebResModel } from '../../models/web.model'
import { AddressShowResModel } from '../../models/address/address.show.model'
import { AddressUpdateResModel } from '../../models/address/address.update.model'
import { AddressIndexQueryModel, AddressIndexResModel } from '../../models/address/address.index.model'

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressSerive) {}

  @Get()
  @HttpCode(200)
  async index(
    @Auth() user: User,
    @Query() query: AddressIndexQueryModel
  ): Promise<WebResModel<AddressIndexResModel[]>> {
    const result = await this.addressService.index(query)
    return { data: result, message: 'Address retrieved successfully' }
  }

  @Get('/:address_id')
  @HttpCode(200)
  async show(
    @Auth() user: User,
    @ParamID('address_id', ParseIntPipe) address_id: number
  ): Promise<WebResModel<AddressShowResModel>> {
    const result = await this.addressService.show(address_id)
    return { data: result, message: 'Address retrieved successfully' }
  }

  @Post()
  @HttpCode(200)
  async create(@Auth() user: User, @Body() req: AddressCreateReqModel): Promise<WebResModel<AddressCreateResModel>> {
    const result = await this.addressService.create(req)
    return { data: result, message: 'Address saved successfully' }
  }

  @Put('/:address_id')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @ParamID('address_id', ParseIntPipe) address_id: number,
    @Body() req: AddressUpdateResModel
  ): Promise<WebResModel<AddressUpdateResModel>> {
    const result = await this.addressService.update(address_id, req)
    return { data: result, message: 'Address updated successfully' }
  }

  @Delete('/:address_id')
  @HttpCode(200)
  async delete(
    @Auth() user: User,
    @ParamID('address_id', ParseIntPipe) address_id: number
  ): Promise<WebResModel<string>> {
    await this.addressService.delete(address_id)
    return { message: 'Address deleted successfully' }
  }
}
