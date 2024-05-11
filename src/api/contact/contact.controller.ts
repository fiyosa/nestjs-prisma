import { Body, Controller, Delete, Get, HttpCode, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { ContactService } from './contact.service'
import { Auth, ParamID } from '../../config/middleware'
import { WebResModel } from '../../models/web.model'
import {
  ApiContactCreate,
  ContactCreateReqModel,
  ContactCreateResModel,
} from '../../models/contact/contact.create.model'
import { User } from '@prisma/client'
import {
  ApiContactUpdate,
  ContactUpdateReqModel,
  ContactUpdateResModel,
} from '../../models/contact/contact.update.model'
import { ApiContactIndex, ContactIndexQueryModel, ContactIndexResModel } from '../../models/contact/contact.index.model'
import { __ } from '../../lang/lang'
import { ApiTags } from '@nestjs/swagger'
import { ApiContactShow, ContactShowResModel } from '../../models/contact/contact.show.model'
import { ApiContactDelete } from '../../models/contact/contact.delete.model'

@ApiTags('Contact')
@Controller('/contact')
export class ContactController {
  private __
  constructor(private readonly contactService: ContactService) {}

  @Get('/:contact_id')
  @HttpCode(200)
  @ApiContactShow()
  async show(
    @Auth() user: User,
    @ParamID('contact_id', ParseIntPipe) contact_id: number
  ): Promise<WebResModel<ContactShowResModel>> {
    const result = await this.contactService.show(contact_id)
    return { data: result, message: __('retrieved_successfully', { operator: __('contact') }) }
  }

  @Post('/')
  @HttpCode(200)
  @ApiContactCreate()
  async create(@Auth() user: User, @Body() req: ContactCreateReqModel): Promise<WebResModel<ContactCreateResModel>> {
    const result = await this.contactService.create(req)
    return { data: result, message: __('saved_successfully', { operator: __('contact') }) }
  }

  @Put('/:contact_id')
  @HttpCode(200)
  @ApiContactUpdate()
  async update(
    @Auth() user: User,
    @ParamID('contact_id', ParseIntPipe) contact_id: number,
    @Body() req: ContactUpdateReqModel
  ): Promise<WebResModel<ContactUpdateResModel>> {
    const result = await this.contactService.update(contact_id, req)
    return { data: result, message: __('updated_successfully', { operator: __('contact') }) }
  }

  @Delete('/:contact_id')
  @HttpCode(200)
  @ApiContactDelete()
  async delete(
    @Auth() user: User,
    @ParamID('contact_id', ParseIntPipe) contact_id: number
  ): Promise<WebResModel<string>> {
    await this.contactService.delete(contact_id)
    return { message: __('deleted_successfully', { operator: __('contact') }) }
  }

  @Get('')
  @HttpCode(200)
  @ApiContactIndex()
  async index(
    @Auth() user: User,
    @Query() query: ContactIndexQueryModel,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
  ): Promise<WebResModel<ContactIndexResModel[]>> {
    query.page = page || 1
    query.limit = limit || 10
    const result = await this.contactService.index(user, query)
    return {
      data: result.data,
      pagination: result.pagination,
      message: __('retrieved_successfully', { operator: __('contact') }),
    }
  }
}
