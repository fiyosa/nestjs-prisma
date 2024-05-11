import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const config = new DocumentBuilder()
    .setTitle('NestJS Prisma')
    .setDescription('Documentation structure folder NestJS with ORM Prisma')
    .setVersion('1.0')
    .addServer('http://localhost:4000/api', 'Local environment')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger', app, document, {
    swaggerOptions: { docExpansion: 'none' },
  })

  app.setGlobalPrefix('/api')

  await app.listen(configService.get('APP_PORT'))
}
bootstrap()
