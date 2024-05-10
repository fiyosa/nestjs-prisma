import { Injectable } from '@nestjs/common'
import { DB } from '../src/config/db'
import { Address, Contact, User } from '@prisma/client'
import { HashUtil } from '../src/utils/hash.util'

@Injectable()
export class TestService {
  constructor(
    private readonly db: DB,
    private readonly hash: HashUtil
  ) {}

  async deleteUser() {
    try {
      await this.db.user.deleteMany({
        where: {
          username: 'test',
        },
      })
    } catch (err) {}
  }

  async deleteContact() {
    try {
      await this.db.contact.deleteMany({
        where: { user: { username: 'test' } },
      })
    } catch (err) {}
  }

  async deleteAddress() {
    try {
      await this.db.address.deleteMany({
        where: { contact: { user: { username: 'test' } } },
      })
    } catch (err) {}
  }

  async createUser(): Promise<User> {
    try {
      return await this.db.user.create({
        data: {
          username: 'test',
          password: this.hash.create('test'),
          name: 'test',
          token: 'test',
        },
      })
    } catch (err) {
      const user: User = {
        id: 0n,
        username: '',
        password: '',
        name: '',
        token: '',
      }
      return user
    }
  }

  async createContact(user_id: number): Promise<Contact> {
    try {
      return await this.db.contact.create({
        data: {
          user_id: user_id,
          first_name: 'test',
          last_name: 'test',
          email: 'test@gmail.com',
          phone: '08193712917',
        },
      })
    } catch (err) {
      const contact: Contact = {
        id: 0n,
        user_id: 0n,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
      }
      return contact
    }
  }

  async createAddress(contact_id: number): Promise<Address> {
    try {
      return await this.db.address.create({
        data: {
          contact_id: contact_id,
          street: 'street test',
          city: 'city test',
          province: 'province test',
          country: 'country test',
          postal_code: 'postal_code test',
        },
      })
    } catch (err) {
      const contact: Address = {
        id: 0n,
        contact_id: 0n,
        street: '',
        city: '',
        province: '',
        country: '',
        postal_code: '',
      }
      return contact
    }
  }
}
