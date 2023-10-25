import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { App } from './app';
import { appConfig } from './configs';

setImmediate(async (): Promise<void> => {
  const app = await NestFactory.create<INestApplication>(App);
  await app.listen(appConfig.port);
})
