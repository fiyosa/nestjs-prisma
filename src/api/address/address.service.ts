import { HttpStatus, Injectable } from '@nestjs/common'
import { DB } from '../../config/db'
import { HashUtil } from '../../utils/hash.util'
import { HelperUtil } from '../../utils/helper.util'
import { LoggerUtil } from '../../utils/logger.util'
import { ValidationUtil } from '../../utils/validation.util'
import { AddressCreateReqModel, AddressCreateResModel } from '../../models/address/address.create.model'
import { AddressValidation } from './address.validation'
import { AddressShowResModel } from '../../models/address/address.show.model'
import { AddressUpdateReqModel, AddressUpdateResModel } from '../../models/address/address.update.model'
import { AddressIndexQueryModel } from '../../models/address/address.index.model'

@Injectable()
export class AddressSerive {
  constructor(
    private readonly helper: HelperUtil,
    private readonly logger: LoggerUtil,
    private readonly validation: ValidationUtil,
    private readonly db: DB,
    private readonly hash: HashUtil
  ) {}

  async index(query: AddressIndexQueryModel): Promise<AddressShowResModel[]> {
    try {
      const contact_id = parseInt(this.hash.decode(query.contact_id))
      const addresses = await this.db.address.findMany({ where: { contact_id: contact_id } })
      return addresses.map((address) =>
        this.helper.modelToResponse(AddressShowResModel, {
          ...address,
          id: this.hash.encode(address.id.toString()),
        })
      )
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async create(req: AddressCreateReqModel): Promise<AddressCreateResModel> {
    try {
      const validated: AddressCreateReqModel = this.validation.validate(AddressValidation.CREATE, req)
      const contact_id: number = parseInt(this.hash.decode(validated.contact_id))
      const contact = await this.db.contact.findFirst({
        where: { id: contact_id },
      })
      if (!contact) this.helper.exception('Contact is not found', HttpStatus.BAD_REQUEST)
      const address = await this.db.address.create({
        data: { ...validated, contact_id: contact_id },
      })
      return this.helper.modelToResponse(AddressCreateResModel, {
        ...address,
        id: this.hash.encode(address.id.toString()),
      })
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async show(address_id: number): Promise<AddressShowResModel> {
    try {
      const address = await this.db.address.findFirst({ where: { id: address_id } })
      if (!address) this.helper.exception('Address is not found', 404)
      return this.helper.modelToResponse(AddressShowResModel, {
        ...address,
        id: this.hash.encode(address.id.toString()),
      })
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(address_id: number, req: AddressUpdateReqModel): Promise<AddressUpdateResModel> {
    try {
      const validated: AddressUpdateReqModel = this.validation.validate(AddressValidation.UPDATE, req)
      const address = await this.db.address.update({
        where: { id: address_id },
        data: validated,
      })
      if (!address) this.helper.exception('Address is not found', HttpStatus.BAD_REQUEST)
      return this.helper.modelToResponse(AddressUpdateResModel, {
        ...address,
        id: this.hash.encode(address.id.toString()),
      })
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(address_id: number): Promise<void> {
    try {
      const address = await this.db.address.findFirst({ where: { id: address_id } })
      if (!address) this.helper.exception('Address is not found', 404)
      await this.db.address.delete({ where: { id: address_id } })
    } catch (err) {
      this.helper.exception(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
