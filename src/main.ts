import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(path.join(__dirname, '..', 'public'));
    app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
