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
  })

  describe('POST /auth/register', () => {
    it('Should be rejected if request is invalid', async () => {
      const res = await request(app.getHttpServer()).post('/auth/register').send({
        username: '',
        password: '',
        name: '',
      })

      expect(res.status).toBe(400)
      expect(res.body.errors).toBeDefined()
    })

    it('Should be able to register', async () => {
      const res = await request(app.getHttpServer()).post('/auth/register').send({
        username: 'test',
        password: 'test',
        name: 'test',
      })

      expect(res.status).toBe(200)
      expect(res.body.data.id).toBeDefined()
      expect(res.body.data.username).toBe('test')
      expect(res.body.data.name).toBe('test')
    })

    it('Should be rejected if username already exists', async () => {
      await testService.createUser()

      const res = await request(app.getHttpServer()).post('/auth/register').send({
        username: 'test',
        password: 'test',
        name: 'test',
      })

      expect(res.status).toBe(400)
      expect(res.body.message).toBeDefined()
    })
  })
})
