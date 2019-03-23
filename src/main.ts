import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
  // tslint:disable-next-line:no-console
  console.log('Server is running on http://localhost:3002');
}
bootstrap();
