import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './logger/error.handling';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/role.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3030;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  fs.writeFileSync('swagger.json', JSON.stringify(document, null, 2));

  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  app.useGlobalGuards(
    new JwtAuthGuard(reflector, jwtService),
    new RolesGuard(jwtService, reflector),
  );

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger at http://localhost:${PORT}/api`);
    console.log(`Swagger JSON at http://localhost:${PORT}/api-json`);
  });
}
bootstrap();
