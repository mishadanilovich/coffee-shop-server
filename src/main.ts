import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: true,
  //   preflightContinue: false,
  //   allowedHeaders:
  //     'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  //   methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PATCH', 'OPTIONS'],
  //   credentials: true,
  // });

  const config = new DocumentBuilder()
    .setTitle('Coffee shop')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(7777);
}
bootstrap();
