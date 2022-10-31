import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const logger = new Logger("Opensea System Logger");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    await app.listen(3000);
    logger.log('Listening on port 3000');
  }
  catch (error) {
    var randomPort = Math.floor(Math.random() * 1000) + 3000;
    await app.listen(randomPort);
    logger.log('Listening on port ' + randomPort);
  }
}
bootstrap();
