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
    await testService.createAddress(parseInt(contact.id.toString()))
  })

  describe('GET /address/:contact_id', () => {
    it('Should be rejected if request is invalid', async () => {
      const res = await request(app.getHttpServer())
        .get('/address')
        .query({
          contact_id: 'MNy9bRR9OK',
        })
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(0)
      expect(res.body.message).toBeDefined()
    })

    it('Should be able to get addresses', async () => {
      const res = await request(app.getHttpServer())
        .get('/address')
        .query({
          contact_id: hash.encode(contact.id.toString()),
        })
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
      expect(res.body.message).toBeDefined()
    })
  })
})
