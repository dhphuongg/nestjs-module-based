import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as path from 'path';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from './shared/configs/environment.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());

  // CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // static files in error-files folder
  app.useStaticAssets(path.join(process.cwd(), 'error-files'), {
    prefix: '/error-files',
  });

  // Set global prefix
  app.setGlobalPrefix('api/v1');

  // Swagger API Document
  const documentConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig, {});
  SwaggerModule.setup('/api-docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
  // Save the document to a local file
  const outputPath = path.resolve(process.cwd(), 'swagger.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 4), {
    encoding: 'utf8',
  });

  const configService =
    app.get<ConfigService<EnvironmentConfig>>(ConfigService);
  const port = configService.get<number>('port', 3000);
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Application API Document: ${await app.getUrl()}/api-docs`);
}

bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
