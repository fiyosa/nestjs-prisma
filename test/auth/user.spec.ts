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

  describe('GET /auth/user', () => {
    it('Should be rejected if token is invalid', async () => {
      const res = await request(app.getHttpServer()).get('/auth/user').set('Authorization', 'bearer wrong')

      expect(res.status).toBe(401)
      expect(res.body.message).toBeDefined()
    })

    it('Should be able to get user', async () => {
      const res = await request(app.getHttpServer()).get('/auth/user').set('Authorization', 'bearer test')

      expect(res.status).toBe(200)
      expect(res.body.data.username).toBe('test')
      expect(res.body.data.name).toBe('test')
      expect(res.body.message).toBeDefined()
    })
  })
})
