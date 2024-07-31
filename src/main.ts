import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = 9000;

  //app.useGlobalPipes(new ValidationPipe({}));
  const config = new DocumentBuilder()
    .addBearerAuth() // this decorator specifies the Bearer Authentication security mechanism for the API documentation
    .setTitle('Query Utility System')
    .setDescription('The Query Utility System OpenAPI description.')
    .setVersion('v1.0')
    .addTag('swagger-documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(5019).then(() => {
    console.log(`Application listening for HTTP request on port:5019 ...`);
  });
}

bootstrap();
