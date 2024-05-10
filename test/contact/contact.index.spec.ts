import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../../src/app.module'
import { TestModule } from '../test.module'
import { TestService } from '../test.service'
import { User } from '@prisma/client'

describe('Contact Controller', () => {
  let app: INestApplication
  let testService: TestService
  let user: User

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    testService = app.get(TestService)
    await testService.deleteUser()
    user = await testService.createUser()
    await testService.createContact(parseInt(user.id.toString()))
  })

  describe('GET /contact', () => {
    it('Should be able to search contact by name', async () => {
      const res = await request(app.getHttpServer())
        .get('/contact')
        .query({
          name: 'es',
        })
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('Should be able to search contact by name not found', async () => {
      const res = await request(app.getHttpServer())
        .get('/contact')
        .query({
          name: 'wrong',
        })
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(0)
    })

    it('Should be able to search contact by email', async () => {
      const res = await request(app.getHttpServer())
        .get('/contact')
        .query({
          email: 'es',
        })
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('Should be able to search contact by email not found', async () => {
      const res = await request(app.getHttpServer())
        .get('/contact')
        .query({
          email: 'wrong',
        })
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(0)
    })

    it('Should be able to search contact by phone', async () => {
      const res = await request(app.getHttpServer())
        .get('/contact')
        .query({
          phone: '08',
        })
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(1)
    })

    it('Should be able to search contact by phone not found', async () => {
      const res = await request(app.getHttpServer())
        .get('/contact')
        .query({
          phone: '99',
        })
        .set('Authorization', 'Berear test')

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(0)
    })
  })
})
