import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app.module'
import { TestModule } from '../test.module'
import { TestService } from '../test.service'
import { User } from '@prisma/client'
import { LoggerUtil } from '../../src/utils/logger.util'
import { HashUtil } from '../../src/utils/hash.util'

describe('User Controller', () => {
  let app: INestApplication
  let testService: TestService
  let user: User
  let hashids: HashUtil
  let logger: LoggerUtil

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    hashids = await app.get(HashUtil)
    testService = app.get(TestService)
    logger = app.get(LoggerUtil)

    await testService.deleteUser()
    user = await testService.createUser()

    logger.info('Test User Controller')
  })

  describe('PUT /user/:id', () => {
    it('Should be rejected if request is invalid', async () => {
      const res = await request(app.getHttpServer())
        .put(`/user/${hashids.encode(user.id.toString())}`)
        .set('Authorization', 'Bearer test')
        .send({
          password: '',
          name: '',
        })

      expect(res.status).toBe(400)
      expect(res.body.errors).toBeDefined()
    })

    it('Should be able update name', async () => {
      const res = await request(app.getHttpServer())
        .put(`/user/${hashids.encode(user.id.toString())}`)
        .set('Authorization', 'Bearer test')
        .send({
          name: 'test updated',
        })

      expect(res.status).toBe(200)
      expect(res.body.data.username).toBe('test')
      expect(res.body.data.name).toBe('test updated')
    })

    it('Should be able update password', async () => {
      const res = await request(app.getHttpServer())
        .put(`/user/${hashids.encode(user.id.toString())}`)
        .set('Authorization', 'Bearer test')
        .send({
          password: 'test updated',
        })

      expect(res.status).toBe(200)
      expect(res.body.data.username).toBe('test')
      expect(res.body.data.name).toBe('test')

      const resLogin = await request(app.getHttpServer()).post('/auth/login').send({
        username: 'test',
        password: 'test updated',
      })

      expect(resLogin.status).toBe(200)
      expect(resLogin.body.data.token).toBeDefined()
    })
  })
})
