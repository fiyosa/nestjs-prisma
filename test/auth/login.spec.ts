import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app.module'
import { TestModule } from '../test.module'
import { TestService } from '../test.service'

describe('Auth Controller', () => {
  let app: INestApplication
  let testService: TestService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    testService = app.get(TestService)
    await testService.deleteUser()
    await testService.createUser()
  })

  describe('POST /auth/login', () => {
    it('Should be rejected if request is invalid', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send({
        username: '',
        password: '',
      })

      expect(res.status).toBe(400)
      expect(res.body.errors).toBeDefined()
    })

    it('Should be able to login', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send({
        username: 'test',
        password: 'test',
      })

      expect(res.status).toBe(200)
      expect(res.body.data.token).toBeDefined()
    })
  })
})
