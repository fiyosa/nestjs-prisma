import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app.module'
import { TestModule } from '../test.module'
import { TestService } from '../test.service'
import { Contact, User } from '@prisma/client'
import { HashUtil } from '../../src/utils/hash.util'

describe('Contact Controller', () => {
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

  describe('DELETE /contact/:id', () => {
    it('Should be rejected if request is invalid', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/contact/${'MNy9bR9OKY'}`)
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(400)
      expect(res.body.message).toBeDefined()
    })

    it('Should be able to delete contact', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/contact/${hash.encode(contact.id.toString())}`)
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(200)
      expect(res.body.message).toBeDefined()
    })
  })
})
