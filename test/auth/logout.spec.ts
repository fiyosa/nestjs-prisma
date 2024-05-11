import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
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

  describe('DELETE /auth/logout', () => {
    it('Should be rejected if token is invalid', async () => {
      const res = await request(app.getHttpServer()).delete('/auth/logout').set('Authorization', 'Berear wrong')

      expect(res.status).toBe(HttpStatus.UNAUTHORIZED)
      expect(res.body.message).toBe('Unauthorized')
    })

    it('Should be able to logout user', async () => {
      const res = await request(app.getHttpServer()).delete('/auth/logout').set('Authorization', 'Berear test')

      expect(res.status).toBe(HttpStatus.OK)
      expect(res.body.message).toBeDefined()
    })

    it('Should be able to get user', async () => {
      const res = await request(app.getHttpServer()).get('/auth/user').set('Authorization', 'Berear test')

      expect(res.status).toBe(HttpStatus.OK)
      expect(res.body.data.username).toBe('test')
      expect(res.body.data.name).toBe('test')
    })
  })
})
