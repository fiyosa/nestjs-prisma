import { Body, Controller, Delete, Get, HttpCode, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { ContactService } from './contact.service'
import { Auth, ParamID } from '../../config/middleware'
import { WebResModel } from '../../models/web.model'
import { ContactCreateReqModel, ContactCreateResModel } from '../../models/contact/contact.create.model'
import { User } from '@prisma/client'
import { ContactUpdateReqModel, ContactUpdateResModel } from '../../models/contact/contact.update.model'
import { ContactSearchQueryModel, ContactSearchResModel } from '../../models/contact/contact.search.model'
import { __ } from '../../lang/lang'

@Controller('/contact')
export class ContactController {
  private __
  constructor(private readonly contactService: ContactService) {}

  @Get('/:contact_id')
  @HttpCode(200)
  async show(
    @Auth() user: User,
    @ParamID('contact_id', ParseIntPipe) contact_id: number
  ): Promise<WebResModel<ContactCreateResModel>> {
    const result = await this.contactService.show(contact_id)
    return { data: result, message: __('retrieved_successfully', { operator: __('contact') }) }
  }

  @Post('/')
  @HttpCode(200)
  async create(@Auth() user: User, @Body() req: ContactCreateReqModel): Promise<WebResModel<ContactCreateResModel>> {
    const result = await this.contactService.create(req)
    return { data: result, message: __('saved_successfully', { operator: __('contact') }) }
  }

  @Put('/:contact_id')
  @HttpCode(200)
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
  async remove(
    @Auth() user: User,
    @ParamID('contact_id', ParseIntPipe) contact_id: number
  ): Promise<WebResModel<string>> {
    await this.contactService.show(contact_id)
    return { message: 'Contact deleted successfully' }
  }

  @Get('')
  @HttpCode(200)
  async index(
    @Auth() user: User,
    @Query() query: ContactSearchQueryModel,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number
  ): Promise<WebResModel<ContactSearchResModel[]>> {
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
