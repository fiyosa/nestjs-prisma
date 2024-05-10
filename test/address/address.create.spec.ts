import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app.module'
import { TestModule } from '../test.module'
import { TestService } from '../test.service'
import { Contact, User } from '@prisma/client'
import { HashUtil } from '../../src/utils/hash.util'

describe('Address Controller', () => {
  let app: INestApplication
  let testService: TestService
  let user: User
  let contact: Contact
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
  })

  describe('POST /address', () => {
    it('Should be rejected if request is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/address')
        .set('Authorization', 'Berear test')
        .send({
          contact_id: hash.encode(contact.id.toString()),
          street: '',
          city: '',
          province: '',
          country: '',
          postal_code: '',
        })

      expect(res.status).toBe(400)
      expect(res.body.errors).toBeDefined()
      expect(res.body.message).toBeDefined()
    })

    it('Should be able to create address', async () => {
      const res = await request(app.getHttpServer())
        .post('/address')
        .set('Authorization', 'Berear test')
        .send({
          contact_id: hash.encode(contact.id.toString()),
          street: 'street test',
          city: 'city test',
          province: 'province test',
          country: 'country test',
          postal_code: 'postal_code test',
        })

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
