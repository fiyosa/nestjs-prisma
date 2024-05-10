import { HttpStatus, Injectable } from '@nestjs/common'
import { DB } from '../../config/db'
import { HashUtil } from '../../utils/hash.util'
import { HelperUtil } from '../../utils/helper.util'
import { LoggerUtil } from '../../utils/logger.util'
import { ValidationUtil } from '../../utils/validation.util'
import { ContactCreateReqModel, ContactCreateResModel } from '../../models/contact/contact.create.model'
import { ContactValidation } from './contact.validation'
import { ContactShowResModel } from '../../models/contact/contact.show.model'
import { ContactUpdateReqModel, ContactUpdateResModel } from '../../models/contact/contact.update.model'
import { User } from '@prisma/client'
import { ContactSearchQueryModel, ContactSearchResModel } from '../../models/contact/contact.search.model'
import { WebResModel } from '../../models/web.model'

@Injectable()
export class ContactService {
  constructor(
    private readonly helper: HelperUtil,
    private readonly logger: LoggerUtil,
    private readonly validation: ValidationUtil,
    private readonly db: DB,
    private readonly hash: HashUtil
  ) {}

  async index(user: User, req: ContactSearchQueryModel): Promise<WebResModel<ContactSearchResModel[]>> {
    try {
      const validated: ContactSearchQueryModel = this.validation.validate(ContactValidation.SEARCH, req)
      const filters = []

      if (validated.name) {
        filters.push({
          OR: [{ first_name: { contains: validated.name } }, { last_name: { contains: validated.name } }],
        })
      }

      if (validated.email) {
        filters.push({
          OR: [{ email: { contains: validated.email } }],
        })
      }

      if (validated.phone) {
        filters.push({
          OR: [{ phone: { contains: validated.phone } }],
        })
      }

      const countContact = await this.db.contact.count({
        where: { user_id: user.id, AND: filters },
      })

      const contacts = await this.db.contact.findMany({
        where: {
          user_id: user.id,
          AND: filters,
        },
        take: validated.limit,
        skip: (validated.page - 1) * validated.limit,
      })

      return {
        data: contacts.map((contact) =>
          this.helper.modelToResponse(ContactSearchResModel, {
            ...contact,
            id: this.hash.encode(contact.id.toString()),
          })
        ),
        pagination: {
          page: validated.page,
          limit: validated.limit,
          total: countContact,
        },
      }
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async show(contact_id: number): Promise<ContactShowResModel> {
    try {
      const contact = await this.db.contact.findFirst({ where: { id: contact_id } })
      if (!contact) this.helper.exception('Contact is not found', HttpStatus.BAD_REQUEST)
      return this.helper.modelToResponse(ContactShowResModel, {
        ...contact,
        id: this.hash.encode(contact.id.toString()),
      })
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async create(req: ContactCreateReqModel): Promise<ContactCreateResModel> {
    try {
      const validated: ContactCreateReqModel = this.validation.validate(ContactValidation.CREATE, req)

      const contact = await this.db.contact.create({
        data: { ...validated, user_id: parseInt(this.hash.decode(validated.user_id)) },
      })

      const result = this.helper.modelToResponse(ContactCreateResModel, {
        ...contact,
        id: this.hash.encode(contact.id.toString()),
      })

      return result
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(contact_id: number, req: ContactUpdateReqModel): Promise<ContactUpdateResModel> {
    try {
      const validated: ContactUpdateReqModel = this.validation.validate(ContactValidation.UPDATE, req)
      const contact = await this.db.contact.findFirst({ where: { id: contact_id } })

      if (!contact) this.helper.exception('Contact is not found', HttpStatus.BAD_REQUEST)

      contact.first_name = validated.first_name
      contact.last_name = validated.last_name
      contact.email = validated.email
      contact.phone = validated.phone

      const newContact = await this.db.contact.update({ where: { id: contact_id }, data: contact })

      return this.helper.modelToResponse(ContactUpdateResModel, {
        ...newContact,
        id: this.hash.encode(newContact.id.toString()),
      })
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(contact_id: number) {
    try {
      const contact = await this.db.contact.findFirst({ where: { id: contact_id } })
      if (!contact) this.helper.exception('Contact is not found', HttpStatus.BAD_REQUEST)
      return await this.db.contact.delete({ where: { id: contact_id } })
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
