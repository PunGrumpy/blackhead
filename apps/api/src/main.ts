import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const projectName = 'Blackhead'
  const projectDescription =
    'A vulnerability detection and penetration testing system with automatic report generation'
  const globalPrefix = 'api/v1'
  const pathDocs = 'docs'
  const port = process.env.PORT || 3001

  app.setGlobalPrefix(globalPrefix)
  // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  app.use(
    helmet({
      contentSecurityPolicy: false
    })
  )

  const config = new DocumentBuilder()
    .setTitle(projectName)
    .setDescription(projectDescription)
    .setVersion('1.0')
    .addTag('API Documentation')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)

  app.use(
    `/${pathDocs}`,
    apiReference({
      theme: 'deepSpace',
      spec: {
        content: document
      }
    })
  )

  await app.listen(port)
  Logger.log(`🚀 Server running on http://localhost:${port}`, 'RunOn')
  Logger.log(
    `🚀 API Reference running on http://localhost:${port}/${pathDocs}`,
    'RunOn'
  )
}

bootstrap()
