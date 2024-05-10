import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app.module'
import { TestModule } from '../test.module'
import { TestService } from '../test.service'
import { Address, Contact, User } from '@prisma/client'
import { HashUtil } from '../../src/utils/hash.util'

describe('Address Controller', () => {
  let app: INestApplication
  let testService: TestService
  let user: User
  let contact: Contact
  let address: Address
  let hash: HashUtil

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    hash = app.get(HashUtil)

    testService = app.get(TestService)
    await testService.deleteUser()
    user = await testService.createUser()
    contact = await testService.createContact(parseInt(user.id.toString()))
    address = await testService.createAddress(parseInt(contact.id.toString()))
  })

  describe('GET /address/:contact_id', () => {
    it('Should be rejected if request is invalid', async () => {
      const res = await request(app.getHttpServer()).get(`/address/${'AmLldR02wb'}`).set('Authorization', 'Berear test')

      expect(res.status).toBe(404)
      expect(res.body.message).toBeDefined()
    })

    it('Should be able to get address', async () => {
      const res = await request(app.getHttpServer())
        .get(`/address/${hash.encode(address.id.toString())}`)
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(200)
      expect(res.body.data.id).toBeDefined()
      expect(res.body.data.street).toBe('street test')
      expect(res.body.data.city).toBe('city test')
      expect(res.body.data.province).toBe('province test')
      expect(res.body.data.country).toBe('country test')
      expect(res.body.data.postal_code).toBe('postal_code test')
      expect(res.body.message).toBeDefined()
    })
  })
})
