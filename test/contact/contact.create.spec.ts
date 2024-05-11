import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app.module'
import { TestModule } from '../test.module'
import { TestService } from '../test.service'
import { User } from '@prisma/client'
import { HashUtil } from '../../src/utils/hash.util'

describe('Contact Controller', () => {
  let app: INestApplication
  let testService: TestService
  let user: User
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
  })

  describe('POST /contact', () => {
    it('Should be rejected if request is invalid', async () => {
      const res = await request(app.getHttpServer()).post('/contact').set('Authorization', 'Berear test').send({
        user_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
      })

      expect(res.status).toBe(400)
      expect(res.body.errors).toBeDefined()
    })

    it('Should be able to create contact', async () => {
      const res = await request(app.getHttpServer())
        .post('/contact')
        .set('Authorization', 'Berear test')
        .send({
          user_id: hash.encode(user.id.toString()),
          first_name: 'test',
          last_name: 'test',
          email: 'test@gmail.com',
          phone: '08193712917',
        })

      expect(res.status).toBe(200)
      expect(res.body.data.id).toBeDefined()
      expect(res.body.data.first_name).toBe('test')
      expect(res.body.data.last_name).toBe('test')
      expect(res.body.data.email).toBe('test@gmail.com')
      expect(res.body.data.phone).toBe('08193712917')
      expect(res.body.message).toBeDefined()
    })
  })
})
