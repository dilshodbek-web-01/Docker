import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from '@configs';
import { LanguageModule } from '@module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true
    }),
    LanguageModule
  ],
})
export class App {}
