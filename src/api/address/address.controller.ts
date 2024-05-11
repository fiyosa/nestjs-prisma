import { Body, Controller, Delete, Get, HttpCode, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { AddressSerive } from './address.service'
import { Auth, ParamID } from '../../config/middleware'
import { User } from '@prisma/client'
import {
  AddressCreateReqModel,
  AddressCreateResModel,
  ApiAddressCreate,
} from '../../models/address/address.create.model'
import { WebResModel } from '../../models/web.model'
import { AddressShowResModel, ApiAddressShow } from '../../models/address/address.show.model'
import { AddressUpdateResModel, ApiAddressUpdate } from '../../models/address/address.update.model'
import { AddressIndexQueryModel, AddressIndexResModel, ApiAddressIndex } from '../../models/address/address.index.model'
import { __ } from '../../lang/lang'
import { ApiTags } from '@nestjs/swagger'
import { ApiDeleteDelete } from '../../models/address/address.delete.model'

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressSerive) {}

  @Get()
  @HttpCode(200)
  @ApiAddressIndex()
  async index(
    @Auth() user: User,
    @Query() query: AddressIndexQueryModel
  ): Promise<WebResModel<AddressIndexResModel[]>> {
    const result = await this.addressService.index(query)
    return { data: result, message: __('retrieved_successfully', { operator: __('address') }) }
  }

  @Get('/:address_id')
  @HttpCode(200)
  @ApiAddressShow()
  async show(
    @Auth() user: User,
    @ParamID('address_id', ParseIntPipe) address_id: number
  ): Promise<WebResModel<AddressShowResModel>> {
    const result = await this.addressService.show(address_id)
    return { data: result, message: __('retrieved_successfully', { operator: __('address') }) }
  }

  @Post()
  @HttpCode(200)
  @ApiAddressCreate()
  async create(@Auth() user: User, @Body() req: AddressCreateReqModel): Promise<WebResModel<AddressCreateResModel>> {
    const result = await this.addressService.create(req)
    return { data: result, message: __('saved_successfully', { operator: __('address') }) }
  }

  @Put('/:address_id')
  @HttpCode(200)
  @ApiAddressUpdate()
  async update(
    @Auth() user: User,
    @ParamID('address_id', ParseIntPipe) address_id: number,
    @Body() req: AddressUpdateResModel
  ): Promise<WebResModel<AddressUpdateResModel>> {
    const result = await this.addressService.update(address_id, req)
    return { data: result, message: __('updated_successfully', { operator: __('address') }) }
  }

  @Delete('/:address_id')
  @HttpCode(200)
  @ApiDeleteDelete()
  async delete(
    @Auth() user: User,
    @ParamID('address_id', ParseIntPipe) address_id: number
  ): Promise<WebResModel<string>> {
    await this.addressService.delete(address_id)
    return { message: __('deleted_successfully', { operator: __('address') }) }
  }
}
