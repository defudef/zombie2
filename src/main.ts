import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { EntityNotFoundErrorFilter } from './shared/exception-filters/entity-not-found-error.filter';

(async () => {
  const app = await NestFactory.create(AppModule);
  const port = app.get('ConfigService').get('config.port')

  app.useGlobalFilters(new EntityNotFoundErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: false,
        value: false,
      },
    })
  );

  await app.listen(Number.parseInt(port));

  Logger.log(`App is listening to port ${port}.`, 'Bootstrap');
})();
