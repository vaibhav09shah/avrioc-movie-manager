import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule , DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Adding Swagger Document Options 
  const options = new DocumentBuilder()
    .setTitle('Movies API')
    .setDescription('Movies API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger/docs',app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
